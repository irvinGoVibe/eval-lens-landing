import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/cms/admin-client";

/**
 * Low-commitment lead intake ("send us your batch"). Writes to the
 * `site_leads` table (service_role; RLS closed to anon by design).
 * Honeypot field `website` silently accepts bots without storing.
 */
export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const s = (v: unknown, max = 500) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  if (s(payload.website)) return NextResponse.json({ ok: true });

  const email = s(payload.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const row = {
    email,
    name: s(payload.name, 200) || null,
    org: s(payload.org, 200) || null,
    program_type: s(payload.programType, 100) || null,
    batch_size: s(payload.batchSize, 50) || null,
    message: s(payload.message, 2000) || null,
    source_path: s(payload.sourcePath, 300) || null,
  };

  const { error } = await getAdminSupabase().from("site_leads").insert(row);
  if (error) {
    console.error("lead insert failed:", error.message);
    return NextResponse.json({ error: "storage" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
