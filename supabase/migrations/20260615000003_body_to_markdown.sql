-- EvalLense blog — migrate article bodies from Block[] (JSONB) to Markdown (text).
--
-- Story 02, etape 6: the article body becomes a Markdown source string instead
-- of a structured Block[] array. The data type (articles.body JSONB -> text)
-- and the public renderer (app/blog/[slug]/page.tsx via react-markdown) roll
-- out together, so old structured bodies must be regenerated into Markdown in
-- the same migration.
--
-- Deterministic Block -> Markdown mapping (mirrors the renderer):
--   { "type":"p",     "text": T }              -> T
--   { "type":"h2",    "text": T }              -> "## " || T
--   { "type":"quote", "text": T, "cite": C }   -> "> " || T  (+ "> "  || "> — " || C when cite present)
--   { "type":"list",  "items": [..] }          -> "- item" lines
-- Blocks are separated by a blank line (Markdown paragraph break).

-- ---------------------------------------------------------------------------
-- 1) Add a temporary text column holding the regenerated Markdown.
-- ---------------------------------------------------------------------------
alter table public.articles add column if not exists body_md text;

-- ---------------------------------------------------------------------------
-- 2) Regenerate Markdown from each row's Block[] body.
-- ---------------------------------------------------------------------------
do $$
declare
  rec       record;
  blk       jsonb;
  item      jsonb;
  parts     text[];
  block_md  text;
  list_md   text;
  cite_val  text;
begin
  for rec in select id, body from public.articles loop
    parts := array[]::text[];

    -- Skip rows whose body is not a JSON array (defensive — all seeded rows are).
    if rec.body is null or jsonb_typeof(rec.body) <> 'array' then
      update public.articles set body_md = coalesce(rec.body::text, '') where id = rec.id;
      continue;
    end if;

    for blk in select * from jsonb_array_elements(rec.body) loop
      block_md := null;

      case blk->>'type'
        when 'h2' then
          block_md := '## ' || coalesce(blk->>'text', '');
        when 'p' then
          block_md := coalesce(blk->>'text', '');
        when 'quote' then
          block_md := '> ' || coalesce(blk->>'text', '');
          cite_val := blk->>'cite';
          if cite_val is not null and cite_val <> '' then
            -- blank quote line + attribution, kept inside the same blockquote.
            block_md := block_md || E'\n>\n> — ' || cite_val;
          end if;
        when 'list' then
          list_md := '';
          for item in select * from jsonb_array_elements(coalesce(blk->'items', '[]'::jsonb)) loop
            if list_md <> '' then
              list_md := list_md || E'\n';
            end if;
            -- jsonb_array_elements yields each item as a JSON string; #>>'{}' unwraps it.
            list_md := list_md || '- ' || coalesce(item #>> '{}', '');
          end loop;
          block_md := list_md;
        else
          -- Unknown block type: fall back to its text field, else skip.
          block_md := coalesce(blk->>'text', '');
      end case;

      if block_md is not null and block_md <> '' then
        parts := array_append(parts, block_md);
      end if;
    end loop;

    update public.articles
      set body_md = array_to_string(parts, E'\n\n')
      where id = rec.id;
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 3) Swap the column: drop the JSONB body, rename the text column to body.
-- ---------------------------------------------------------------------------
alter table public.articles drop column body;
alter table public.articles rename column body_md to body;
