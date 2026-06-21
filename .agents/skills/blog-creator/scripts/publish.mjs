// EvalLense blog-creator — publish an article to Supabase (the CMS the admin reads).
//
// WHY THIS EXISTS
// The /admin panel is a thin CRUD over the `articles` table (service_role,
// bypasses RLS). Any correctly-shaped row in `articles` automatically shows up
// in /admin/blog/articles and is editable there. So "publish through the admin"
// == "upsert a row into `articles`". This script does exactly that, plus uploads
// and optimizes the article's images into the public `media` Storage bucket.
//
// HOW IT TALKS TO SUPABASE
//   - Writes go through PostgREST + Storage REST over global fetch (Node 18+).
//     We deliberately do NOT use @supabase/supabase-js: on Node < 22 its realtime
//     client throws "Node.js 20 detected without native WebSocket support" at
//     createClient. REST needs nothing but fetch.
//   - The service_role key + project URL are pulled at runtime from the Supabase
//     CLI (`supabase projects api-keys`). Nothing secret is written to disk.
//
// IDEMPOTENT: re-running republishes (upsert on slug; images upserted to
// deterministic Storage paths). Editing in the admin afterwards is preserved
// until the next republish, which overwrites the columns this script sends
// (home_featured / home_position / created_at are never sent, so they survive).
//
// USAGE
//   node publish.mjs <slug> [--project-ref=<ref>] [--status=draft|published]
//                           [--assets=<dir>] [--dry-run]
//
//   <slug>          reads notes/blog/<slug>.md (Step 7b delivery file)
//   --project-ref   Supabase project ref (default: evallense-site)
//   --status        overrides frontmatter status (default: published)
//   --assets        dir holding source images for this slug
//                   (default: notes/blog/_assets-src/<short>/ per image path)
//   --dry-run       parse + optimize, print the row, but do not write anything

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, basename, extname, resolve } from "node:path";

// ---------------------------------------------------------------------------
// Paths & constants
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
// scripts/ -> blog-creator/ -> skills/ -> .claude/ -> repo root (eval-lens-landing)
const REPO = resolve(__dirname, "..", "..", "..", "..");
const NOTES_BLOG = join(REPO, "notes", "blog");
const ASSETS_SRC = join(NOTES_BLOG, "_assets-src");
const DEFAULT_PROJECT_REF = "wlnkmhxeuwvnyojiksfu"; // evallense-site
const BUCKET = "media";

const CATEGORIES = ["Press Release", "Product", "Research"];
const ACCENTS = ["violet", "cyan", "aqua", "orange"];
const IMG_EXT = [".svg", ".webp", ".png", ".jpg", ".jpeg", ".avif"];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (name, def) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : def;
};
const hasFlag = (name) => argv.includes(`--${name}`);

if (!slug) {
  console.error("Usage: node publish.mjs <slug> [--project-ref=…] [--status=…] [--assets=…] [--dry-run]");
  process.exit(1);
}
const projectRef = flag("project-ref", DEFAULT_PROJECT_REF);
const statusOverride = flag("status", "published");
const assetsOverride = flag("assets", null);
const dryRun = hasFlag("dry-run");

// ---------------------------------------------------------------------------
// Frontmatter + body
// ---------------------------------------------------------------------------
function parseArticle(path) {
  const raw = readFileSync(path, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No YAML frontmatter in ${path}`);
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    fm[mm[1]] = v;
  }
  return { fm, body: m[2].trim() };
}

// ---------------------------------------------------------------------------
// Image resolution + optimization (sharp from web/node_modules)
// ---------------------------------------------------------------------------
let _sharp = null;
async function getSharp() {
  if (_sharp) return _sharp;
  const pkgPath = join(REPO, "web", "node_modules", "sharp", "package.json");
  if (!existsSync(pkgPath)) {
    throw new Error("sharp not found in web/node_modules — run `pnpm install` in web/ first.");
  }
  const main = JSON.parse(readFileSync(pkgPath, "utf8")).main || "lib/index.js";
  const entry = join(REPO, "web", "node_modules", "sharp", main);
  _sharp = (await import(pathToFileURL(entry).href)).default;
  return _sharp;
}

// `<short>` = the path segment after /assets/blog/ ; e.g. /assets/blog/foo/cover.png -> "foo"
function shortFromPath(p) {
  const m = p.match(/\/assets\/blog\/([^/]+)\//);
  return m ? m[1] : slug;
}

// Find the local source image for a referenced markdown path. Looks in the
// assets dir for a file with the same basename and any supported extension
// (so a generated `.svg` or a user-uploaded `.png` both resolve). User-supplied
// raster wins over a generated `.svg` of the same name.
function resolveSource(refPath) {
  const short = shortFromPath(refPath);
  const dir = assetsOverride ? resolve(assetsOverride) : join(ASSETS_SRC, short);
  if (!existsSync(dir)) return null;
  const wantBase = basename(refPath, extname(refPath));
  const files = readdirSync(dir).filter(
    (f) => basename(f, extname(f)) === wantBase && IMG_EXT.includes(extname(f).toLowerCase()),
  );
  if (!files.length) return null;
  // Prefer a raster/user upload over the .svg generation source.
  const ordered = files.sort((a, b) => (extname(a) === ".svg" ? 1 : 0) - (extname(b) === ".svg" ? 1 : 0));
  return join(dir, ordered[0]);
}

// Optimize to WebP (rasterize SVG at high density), capped width, never upscale.
async function optimize(srcPath, maxWidth) {
  const sharp = await getSharp();
  const isSvg = extname(srcPath).toLowerCase() === ".svg";
  const input = isSvg ? sharp(srcPath, { density: 200 }) : sharp(srcPath);
  const meta = await input.metadata();
  let pipe = input;
  if (meta.width && meta.width > maxWidth) {
    pipe = pipe.resize({ width: maxWidth, withoutEnlargement: true });
  }
  return pipe.webp({ quality: 80, effort: 5 }).toBuffer();
}

// ---------------------------------------------------------------------------
// Supabase REST
// ---------------------------------------------------------------------------
function serviceKey(ref) {
  const out = execFileSync("supabase", ["projects", "api-keys", "--project-ref", ref, "-o", "json"], {
    encoding: "utf8",
  });
  const keys = JSON.parse(out);
  const k = keys.find((x) => x.name === "service_role");
  if (!k) throw new Error(`No service_role key returned for project ${ref} (is the CLI logged in?).`);
  return k.api_key;
}

async function uploadImage(base, key, storagePath, buf) {
  const url = `${base}/storage/v1/object/${BUCKET}/${storagePath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "image/webp",
      "x-upsert": "true",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: buf,
  });
  if (!res.ok) throw new Error(`upload ${storagePath}: ${res.status} ${await res.text()}`);
  return `${base}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

async function upsertArticle(base, key, row) {
  const url = `${base}/rest/v1/articles?on_conflict=slug`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`upsert articles: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const articlePath = join(NOTES_BLOG, `${slug}.md`);
if (!existsSync(articlePath)) throw new Error(`Not found: ${articlePath} (run Step 7b first).`);

const { fm, body } = parseArticle(articlePath);
const status = statusOverride === "draft" ? "draft" : "published";

// Validate the hard constraints up front (clear error beats a 400 from PostgREST).
if (!CATEGORIES.includes(fm.category)) {
  throw new Error(`category "${fm.category}" invalid — use one of: ${CATEGORIES.join(", ")}`);
}
if (!ACCENTS.includes(fm.accent)) {
  throw new Error(`accent "${fm.accent}" invalid — use one of: ${ACCENTS.join(", ")}`);
}

const base = `https://${projectRef}.supabase.co`;
const key = dryRun ? "DRY" : serviceKey(projectRef);

// Collect every local image reference: the cover + each gallery `![](…)`.
const refs = new Set();
if (fm.cover && fm.cover.startsWith("/assets/blog/")) refs.add(fm.cover);
for (const m of body.matchAll(/!\[[^\]]*\]\((\/assets\/blog\/[^)]+)\)/g)) refs.add(m[1]);

const missing = [];
const urlMap = new Map(); // refPath -> public url

for (const ref of refs) {
  const src = resolveSource(ref);
  if (!src) {
    missing.push(ref);
    continue;
  }
  const isCover = ref === fm.cover;
  const folder = isCover ? "bento" : "photos";
  const short = shortFromPath(ref);
  const name = basename(ref, extname(ref));
  const storagePath = `${folder}/${short}/${name}.webp`;
  const buf = await optimize(src, isCover ? 1600 : 1400);
  const kb = (buf.length / 1024).toFixed(0);
  if (dryRun) {
    console.log(`  [dry] ${basename(src)} -> ${storagePath} (${kb} KB webp)`);
    urlMap.set(ref, `${base}/storage/v1/object/public/${BUCKET}/${storagePath}`);
  } else {
    const url = await uploadImage(base, key, storagePath, buf);
    console.log(`  uploaded ${basename(src)} -> ${storagePath} (${kb} KB webp)`);
    urlMap.set(ref, url);
  }
}

if (missing.length) {
  console.log("\n⚠ No source image found for (left as-is — generate or upload, then re-run):");
  for (const m of missing) console.log(`   ${m}  → expected in ${ASSETS_SRC}/${shortFromPath(m)}/`);
}

// Rewrite local paths -> public Storage URLs in body + cover.
let bodyOut = body;
let coverOut = fm.cover || null;
for (const [ref, url] of urlMap) {
  bodyOut = bodyOut.split(ref).join(url);
  if (coverOut === ref) coverOut = url;
}

const row = {
  slug: fm.slug,
  category: fm.category,
  accent: fm.accent,
  title: fm.title,
  excerpt: fm.excerpt || null,
  date: fm.date,
  read_minutes: fm.readMinutes ? Number(fm.readMinutes) : null,
  cover: coverOut && coverOut.startsWith("http") ? coverOut : null,
  author: fm.author || "Anonymous Unicorn",
  role: fm.role || null,
  body: bodyOut,
  status,
  updated_at: new Date().toISOString(),
};

console.log(`\nArticle: ${row.slug}`);
console.log(`  ${row.category} · ${row.accent} · ${row.read_minutes}m · status=${row.status}`);
console.log(`  cover: ${row.cover ? "set" : "(none — add in admin)"}`);
console.log(`  body: ${row.body.length} chars`);

if (dryRun) {
  console.log("\n[dry-run] nothing written.");
  process.exit(0);
}

const result = await upsertArticle(base, key, row);
const saved = Array.isArray(result) ? result[0] : result;
console.log(`\n✓ Published to Supabase (${projectRef}). Row id: ${saved?.id ?? "?"}`);
console.log(`  Public:  ${base.replace(".supabase.co", "")}  →  /blog/${row.slug}`);
console.log(`  Admin:   /admin/blog/articles/${row.slug}  (editable)`);
