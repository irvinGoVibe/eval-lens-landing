"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MarkdownBody } from "@/components/article/MarkdownBody";
import { uploadArticleMediaAction } from "@/app/admin/blog/articles/actions";
import {
  contentStats,
  insertAtCursor,
  insertBlock,
  makeToken,
  mediaSnippet,
  prefixLines,
  replaceToken,
  slashTriggerIndex,
  uploadingPlaceholder,
  wrapSelection,
  type EditResult,
  type EditState,
} from "./markdown-edit";

/**
 * Enhanced Markdown editor for the article body (Story 05.1). Markdown stays the
 * single canon — the body is still saved verbatim as a Markdown string. On top
 * of the plain textarea we layer a formatting toolbar + hotkeys, cursor-position
 * media insertion (drag/paste/upload via the SAME server action), a slash-menu
 * for blocks & product directives, Write/Preview(/Split) tabs, a local draft
 * autosave, and a footer with word/char/read-time meta.
 *
 * Progressive enhancement: without JS the textarea is still a plain editable
 * field. Upload always goes through `uploadArticleMediaAction` (server-only).
 */

const SPLIT_MIN_WIDTH = 1100;
const MAX_BYTES = 50 * 1024 * 1024; // mirror ImageDropzone / server ceiling
const AUTOSAVE_MS = 800;

type Mode = "write" | "preview" | "split";

interface SlashItem {
  key: string;
  label: string;
  hint: string;
  run: (s: EditState) => EditResult | "image";
}

const SLASH_ITEMS: SlashItem[] = [
  {
    key: "h2",
    label: "Heading 2",
    hint: "## ",
    run: (s) => insertBlock(s, "## "),
  },
  {
    key: "h3",
    label: "Heading 3",
    hint: "### ",
    run: (s) => insertBlock(s, "### "),
  },
  {
    key: "quote",
    label: "Quote",
    hint: "> ",
    run: (s) => insertBlock(s, "> "),
  },
  {
    key: "ul",
    label: "Bullet list",
    hint: "- ",
    run: (s) => insertBlock(s, "- "),
  },
  {
    key: "ol",
    label: "Ordered list",
    hint: "1. ",
    run: (s) => insertBlock(s, "1. "),
  },
  {
    key: "image",
    label: "Image",
    hint: "upload a file",
    run: () => "image",
  },
  {
    key: "video",
    label: "Video",
    hint: '::video{src=""}',
    run: (s) => insertBlock(s, '::video{src=""}'),
  },
  {
    key: "gallery",
    label: "Gallery",
    hint: ":::gallery … :::",
    run: (s) => insertBlock(s, ":::gallery\n![]()\n:::"),
  },
  {
    key: "divider",
    label: "Divider",
    hint: "---",
    run: (s) => insertBlock(s, "---"),
  },
];

function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}

function validate(file: File): string | null {
  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return `Unsupported file type: ${file.type || "unknown"}. Use an image or video.`;
  }
  if (file.size > MAX_BYTES) return "File is too large (max 50 MB).";
  return null;
}

export function MarkdownEditor({
  name,
  defaultValue,
  textareaId,
  draftKey,
}: {
  name: string;
  defaultValue: string;
  /** Id for the body textarea so an external <label htmlFor> can target it. */
  textareaId?: string;
  /** Stable key suffix for the localStorage draft (slug or "new"). */
  draftKey: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<Mode>("write");
  const [canSplit, setCanSplit] = useState(false);
  const [error, setError] = useState("");
  const [busyCount, setBusyCount] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  // Slash-menu state. Declared here (not lower down) so the full-screen Esc
  // effect can read slash.open without a use-before-declaration hazard.
  const [slash, setSlash] = useState<{
    open: boolean;
    index: number;
    /** Index of the triggering "/" in the value, for filtering / cleanup. */
    slashAt: number;
  }>({ open: false, index: 0, slashAt: -1 });

  // Restore banner: a local draft that diverges from the server body. We never
  // overwrite the server body silently — the user explicitly chooses.
  const [draftPreview, setDraftPreview] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Last known caret, so drop/paste while the textarea isn't focused still lands
  // somewhere sensible instead of silently at index 0.
  const lastCaret = useRef<number>(defaultValue.length);
  // Whether the body diverges from the server default (drives autosave + guard).
  const dirtyRef = useRef(false);

  const storageKey = `evallens:draft:article:${draftKey}`;

  // ── Restore: check for a diverging local draft on mount ────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {
      saved = null;
    }
    if (saved != null && saved !== defaultValue) {
      setDraftPreview(saved);
    }
    // Only on first mount per key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // ── Split availability (≥ 1100px) ──────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SPLIT_MIN_WIDTH}px)`);
    const apply = () => setCanSplit(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // If we drop below the split breakpoint while in Split, fall back to Write.
  useEffect(() => {
    if (!canSplit && mode === "split") setMode("write");
  }, [canSplit, mode]);

  // ── Autosave draft (debounced) ─────────────────────────────────────────
  useEffect(() => {
    if (!dirtyRef.current) return;
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, value);
      } catch {
        /* storage full / disabled — non-fatal */
      }
    }, AUTOSAVE_MS);
    return () => window.clearTimeout(id);
  }, [value, storageKey]);

  // ── Unsaved-changes guard ──────────────────────────────────────────────
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // ── Full-screen overlay: lock body scroll + Esc to exit ────────────────
  // The editor is promoted in place (position:fixed) rather than portalled, so
  // the body <textarea name> stays inside the <form> for submission.
  useEffect(() => {
    if (!fullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      // Let the slash menu consume Escape first; only exit when it's closed.
      if (e.key === "Escape" && !slash.open) setFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, slash.open]);

  // ── Clear draft optimistically on form submit (server action redirects) ─
  useEffect(() => {
    const form = textareaRef.current?.form;
    if (!form) return;
    const onSubmit = () => {
      dirtyRef.current = false;
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [storageKey]);

  // Mark the value dirty and update state. Centralised so every path (typing,
  // toolbar, slash, media) flips the guard + autosave.
  const commit = useCallback((next: string) => {
    dirtyRef.current = true;
    setValue(next);
  }, []);

  // Apply an EditResult to the textarea + state and restore the selection.
  const applyEdit = useCallback(
    (result: EditResult) => {
      commit(result.value);
      const el = textareaRef.current;
      if (!el) return;
      // Defer until React flushes the new value, then restore selection + focus.
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(result.selectionStart, result.selectionEnd);
        lastCaret.current = result.selectionEnd;
      });
    },
    [commit],
  );

  const readState = useCallback((): EditState => {
    const el = textareaRef.current;
    if (!el) {
      return {
        value,
        selectionStart: lastCaret.current,
        selectionEnd: lastCaret.current,
      };
    }
    return {
      value: el.value,
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd,
    };
  }, [value]);

  // ── Media upload at the caret via a unique placeholder token ───────────
  const uploadAtState = useCallback(
    async (file: File, state: EditState) => {
      const invalid = validate(file);
      if (invalid) {
        setError(invalid);
        return;
      }
      setError("");
      const token = makeToken();
      const placeholder = uploadingPlaceholder(token);
      // Insert the placeholder at the given caret position immediately.
      const inserted = insertAtCursor(state, placeholder);
      applyEdit(inserted);
      setBusyCount((n) => n + 1);
      try {
        const fd = new FormData();
        fd.set("file", file);
        const result = await uploadArticleMediaAction(fd);
        // Re-read the live value (the user may have edited during upload).
        const current = textareaRef.current?.value ?? inserted.value;
        if ("url" in result) {
          const snippet = mediaSnippet(result.url, isVideoFile(file));
          const next = replaceToken(current, placeholder, snippet);
          if (next != null) commit(next);
        } else {
          const next = replaceToken(current, placeholder, "");
          if (next != null) commit(next);
          setError(result.error || "Upload failed.");
        }
      } catch (e) {
        const current = textareaRef.current?.value ?? inserted.value;
        const next = replaceToken(current, placeholder, "");
        if (next != null) commit(next);
        setError(e instanceof Error ? e.message : "Upload failed.");
      } finally {
        setBusyCount((n) => n - 1);
      }
    },
    [applyEdit, commit],
  );

  // Sequentially upload a batch (one snippet per file), each at the caret that
  // results after the previous insertion.
  const uploadFiles = useCallback(
    async (files: File[], caret: number) => {
      // Start from the explicit caret; subsequent files chain off the live value.
      for (let i = 0; i < files.length; i++) {
        const el = textareaRef.current;
        const state: EditState =
          i === 0
            ? { value: el?.value ?? value, selectionStart: caret, selectionEnd: caret }
            : readState();
        await uploadAtState(files[i], state);
      }
    },
    [readState, uploadAtState, value],
  );

  // ── Toolbar actions ────────────────────────────────────────────────────
  const fmtBold = useCallback(
    () => applyEdit(wrapSelection(readState(), "**", "**", "bold text")),
    [applyEdit, readState],
  );
  const fmtItalic = useCallback(
    () => applyEdit(wrapSelection(readState(), "_", "_", "italic text")),
    [applyEdit, readState],
  );
  const fmtCode = useCallback(
    () => applyEdit(wrapSelection(readState(), "`", "`", "code")),
    [applyEdit, readState],
  );
  const fmtLink = useCallback(() => {
    const s = readState();
    const hasSel = s.selectionEnd > s.selectionStart;
    const label = hasSel ? s.value.slice(s.selectionStart, s.selectionEnd) : "link text";
    const text = `[${label}](url)`;
    // Place the caret inside (url) and select the placeholder so the user types
    // the URL straight away.
    const urlStart = label.length + 3; // "[" + label + "]("
    applyEdit(insertAtCursor(s, text, urlStart, 3));
  }, [applyEdit, readState]);
  const fmtH2 = useCallback(
    () => applyEdit(prefixLines(readState(), "## ")),
    [applyEdit, readState],
  );
  const fmtH3 = useCallback(
    () => applyEdit(prefixLines(readState(), "### ")),
    [applyEdit, readState],
  );
  const fmtQuote = useCallback(
    () => applyEdit(prefixLines(readState(), "> ")),
    [applyEdit, readState],
  );
  const fmtUl = useCallback(
    () => applyEdit(prefixLines(readState(), "- ")),
    [applyEdit, readState],
  );
  const fmtOl = useCallback(
    () => applyEdit(prefixLines(readState(), "", true)),
    [applyEdit, readState],
  );
  const fmtDivider = useCallback(
    () => applyEdit(insertBlock(readState(), "---")),
    [applyEdit, readState],
  );

  const slashQuery =
    slash.open && slash.slashAt >= 0
      ? value.slice(slash.slashAt + 1, lastCaret.current)
      : "";
  const filteredSlash = useMemo(() => {
    const q = slashQuery.trim().toLowerCase();
    if (!q) return SLASH_ITEMS;
    return SLASH_ITEMS.filter((it) => it.label.toLowerCase().includes(q));
  }, [slashQuery]);

  const closeSlash = useCallback(
    () => setSlash((p) => ({ ...p, open: false, slashAt: -1 })),
    [],
  );

  const openFilePicker = useCallback(() => fileInputRef.current?.click(), []);

  const runSlashItem = useCallback(
    (item: SlashItem) => {
      const el = textareaRef.current;
      if (!el) return;
      // Strip the "/" + typed query, then run the item's insertion from there.
      const from = slash.slashAt;
      const to = el.selectionEnd;
      const cleaned =
        from >= 0
          ? el.value.slice(0, from) + el.value.slice(to)
          : el.value;
      closeSlash();
      const base: EditState = {
        value: cleaned,
        selectionStart: from >= 0 ? from : el.selectionStart,
        selectionEnd: from >= 0 ? from : el.selectionEnd,
      };
      const result = item.run(base);
      if (result === "image") {
        // Commit the cleaned value first, then open the picker; the upload will
        // insert at the (now restored) caret.
        applyEdit(insertAtCursor(base, ""));
        openFilePicker();
        return;
      }
      applyEdit(result);
    },
    [applyEdit, closeSlash, openFilePicker, slash.slashAt],
  );

  // ── Textarea event wiring ──────────────────────────────────────────────
  const syncCaret = useCallback(() => {
    const el = textareaRef.current;
    if (el) lastCaret.current = el.selectionEnd;
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      const next = el.value;
      lastCaret.current = el.selectionEnd;
      commit(next);
      // Slash-menu trigger detection on input.
      const trigger = slashTriggerIndex(next, el.selectionEnd);
      if (trigger >= 0) {
        setSlash({ open: true, index: 0, slashAt: trigger });
      } else if (slash.open) {
        // Close if the caret moved before the "/" or the "/" was removed.
        if (el.selectionEnd <= slash.slashAt || next[slash.slashAt] !== "/") {
          closeSlash();
        }
      }
    },
    [commit, slash.open, slash.slashAt, closeSlash],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Slash-menu navigation takes precedence while open.
      if (slash.open && filteredSlash.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSlash((p) => ({ ...p, index: (p.index + 1) % filteredSlash.length }));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSlash((p) => ({
            ...p,
            index: (p.index - 1 + filteredSlash.length) % filteredSlash.length,
          }));
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          runSlashItem(filteredSlash[slash.index] ?? filteredSlash[0]);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          closeSlash();
          return;
        }
      }

      // Formatting hotkeys (only with editor focus).
      const mod = e.metaKey || e.ctrlKey;
      if (mod && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === "b") {
          e.preventDefault();
          fmtBold();
        } else if (k === "i") {
          e.preventDefault();
          fmtItalic();
        } else if (k === "k") {
          e.preventDefault();
          fmtLink();
        }
      }
    },
    [slash.open, slash.index, filteredSlash, runSlashItem, closeSlash, fmtBold, fmtItalic, fmtLink],
  );

  const onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const files = Array.from(e.clipboardData.files ?? []);
      const media = files.filter(
        (f) => f.type.startsWith("image/") || f.type.startsWith("video/"),
      );
      if (media.length === 0) return; // let normal text paste through
      e.preventDefault();
      const el = textareaRef.current;
      const caret = el ? el.selectionStart : lastCaret.current;
      void uploadFiles(media, caret);
    },
    [uploadFiles],
  );

  const [dragOver, setDragOver] = useState(false);
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      const files = Array.from(e.dataTransfer.files ?? []);
      if (files.length === 0) return;
      e.preventDefault();
      setDragOver(false);
      // Resolve the drop point to a caret offset when the browser supports it.
      let caret = lastCaret.current;
      const el = textareaRef.current;
      const docAny = document as unknown as {
        caretPositionFromPoint?: (x: number, y: number) => { offset: number; offsetNode: Node } | null;
        caretRangeFromPoint?: (x: number, y: number) => Range | null;
      };
      if (el) {
        if (typeof docAny.caretPositionFromPoint === "function") {
          const pos = docAny.caretPositionFromPoint(e.clientX, e.clientY);
          if (pos) caret = pos.offset;
        } else if (typeof docAny.caretRangeFromPoint === "function") {
          const range = docAny.caretRangeFromPoint(e.clientX, e.clientY);
          if (range) caret = range.startOffset;
        }
        // Clamp to a valid range; textarea carets are plain offsets.
        caret = Math.max(0, Math.min(caret, el.value.length));
      }
      void uploadFiles(files, caret);
    },
    [uploadFiles],
  );

  // ── Synchronised scroll for Split (proportional; off if reduced-motion) ─
  const writePaneRef = useRef<HTMLTextAreaElement | null>(null);
  const previewPaneRef = useRef<HTMLDivElement | null>(null);
  const syncing = useRef(false);
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const syncScroll = useCallback(
    (from: "write" | "preview") => {
      if (mode !== "split" || reducedMotion.current) return;
      if (syncing.current) {
        syncing.current = false;
        return;
      }
      const src = from === "write" ? writePaneRef.current : previewPaneRef.current;
      const dst = from === "write" ? previewPaneRef.current : writePaneRef.current;
      if (!src || !dst) return;
      const srcMax = src.scrollHeight - src.clientHeight;
      const dstMax = dst.scrollHeight - dst.clientHeight;
      if (srcMax <= 0) return;
      syncing.current = true;
      dst.scrollTop = (src.scrollTop / srcMax) * dstMax;
    },
    [mode],
  );

  const stats = useMemo(() => contentStats(value), [value]);

  const showWrite = mode === "write" || mode === "split";
  const showPreview = mode === "preview" || mode === "split";

  const handleRestore = useCallback(() => {
    if (draftPreview != null) commit(draftPreview);
    setDraftPreview(null);
  }, [commit, draftPreview]);

  const handleDiscard = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setDraftPreview(null);
  }, [storageKey]);

  const busy = busyCount > 0;

  return (
    <div
      className={`admin-mdeditor${fullscreen ? " is-fullscreen" : ""}`}
      role={fullscreen ? "dialog" : undefined}
      aria-modal={fullscreen ? true : undefined}
      aria-label={fullscreen ? "Article body editor — full screen" : undefined}
    >
      {draftPreview != null && (
        <div className="admin-mdrestore" role="status">
          <span className="admin-mdrestore__text">Found an unsaved draft.</span>
          <div className="admin-mdrestore__actions">
            <button type="button" className="admin-mdrestore__btn" onClick={handleRestore}>
              Restore
            </button>
            <button
              type="button"
              className="admin-mdrestore__btn admin-mdrestore__btn--ghost"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </div>
        </div>
      )}

      <div className="admin-mdbar">
        <Toolbar
          onBold={fmtBold}
          onItalic={fmtItalic}
          onCode={fmtCode}
          onH2={fmtH2}
          onH3={fmtH3}
          onQuote={fmtQuote}
          onUl={fmtUl}
          onOl={fmtOl}
          onLink={fmtLink}
          onDivider={fmtDivider}
          onImage={openFilePicker}
        />
        <div className="admin-mdbar__right">
          <Tabs mode={mode} canSplit={canSplit} onChange={setMode} />
          <button
            type="button"
            className="admin-mdtoolbar__btn admin-mdbar__expand"
            onClick={() => setFullscreen((f) => !f)}
            aria-pressed={fullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Expand to full screen"}
            title={fullscreen ? "Exit full screen (Esc)" : "Expand to full screen"}
          >
            {fullscreen ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`admin-md admin-md--${mode}`}>
        {showWrite && (
          <div className={`admin-mdpane${dragOver ? " is-over" : ""}`}>
            <textarea
              id={textareaId}
              name={name}
              className="admin-textarea"
              value={value}
              ref={(el) => {
                textareaRef.current = el;
                writePaneRef.current = el;
              }}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              onSelect={syncCaret}
              onClick={syncCaret}
              onKeyUp={syncCaret}
              onBlur={syncCaret}
              onScroll={() => syncScroll("write")}
              onDragOver={(e) => {
                if (e.dataTransfer?.types?.includes("Files")) {
                  e.preventDefault();
                  setDragOver(true);
                }
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            />
            {slash.open && filteredSlash.length > 0 && (
              <SlashMenu
                items={filteredSlash}
                index={slash.index}
                onPick={runSlashItem}
                onHover={(i) => setSlash((p) => ({ ...p, index: i }))}
              />
            )}
            {busy && (
              <div className="admin-mdpane__busy" role="status" aria-live="polite">
                Uploading…
              </div>
            )}
          </div>
        )}

        {showPreview && (
          <div
            className="admin-md__preview article-body"
            ref={previewPaneRef}
            onScroll={() => syncScroll("preview")}
          >
            <MarkdownBody markdown={value} />
          </div>
        )}
      </div>

      {error && <p className="admin-error admin-mdeditor__error">{error}</p>}

      <div className="admin-mdmeta">
        <span>{stats.words} words</span>
        <span>{stats.chars} characters</span>
        <span>~{stats.readMinutes} min read</span>
      </div>

      {/* Hidden picker for toolbar / slash "Image" — inserts at the caret. */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (files.length) {
            const el = textareaRef.current;
            const caret = el ? el.selectionStart : lastCaret.current;
            void uploadFiles(files, caret);
          }
        }}
      />
    </div>
  );
}

// ── Toolbar ──────────────────────────────────────────────────────────────

function ToolButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="admin-mdtoolbar__btn"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Toolbar(props: {
  onBold: () => void;
  onItalic: () => void;
  onCode: () => void;
  onH2: () => void;
  onH3: () => void;
  onQuote: () => void;
  onUl: () => void;
  onOl: () => void;
  onLink: () => void;
  onDivider: () => void;
  onImage: () => void;
}) {
  return (
    <div className="admin-mdtoolbar" role="toolbar" aria-label="Formatting">
      <ToolButton label="Bold (Cmd/Ctrl-B)" onClick={props.onBold}>
        <Icon path="M7 4h6a3.5 3.5 0 0 1 0 7H7zM7 11h7a3.5 3.5 0 0 1 0 7H7z" stroke />
      </ToolButton>
      <ToolButton label="Italic (Cmd/Ctrl-I)" onClick={props.onItalic}>
        <Icon path="M11 4h6M7 18h6M14 4 10 18" stroke />
      </ToolButton>
      <ToolButton label="Inline code" onClick={props.onCode}>
        <Icon path="m9 8-4 4 4 4M15 8l4 4-4 4" stroke />
      </ToolButton>
      <span className="admin-mdtoolbar__sep" aria-hidden="true" />
      <ToolButton label="Heading 2" onClick={props.onH2}>
        <TextIcon>H2</TextIcon>
      </ToolButton>
      <ToolButton label="Heading 3" onClick={props.onH3}>
        <TextIcon>H3</TextIcon>
      </ToolButton>
      <ToolButton label="Quote" onClick={props.onQuote}>
        <Icon path="M7 7h4v6H7zM7 13c0 2 1 3 3 3M13 7h4v6h-4zM13 13c0 2 1 3 3 3" stroke />
      </ToolButton>
      <span className="admin-mdtoolbar__sep" aria-hidden="true" />
      <ToolButton label="Bullet list" onClick={props.onUl}>
        <Icon path="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" stroke />
      </ToolButton>
      <ToolButton label="Ordered list" onClick={props.onOl}>
        <Icon path="M10 6h10M10 12h10M10 18h10M4 5h1v4M4 9h2" stroke />
      </ToolButton>
      <span className="admin-mdtoolbar__sep" aria-hidden="true" />
      <ToolButton label="Link (Cmd/Ctrl-K)" onClick={props.onLink}>
        <Icon path="M10 14a4 4 0 0 0 6 .5l2-2a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6-.5l-2 2a4 4 0 0 0 6 6l1-1" stroke />
      </ToolButton>
      <ToolButton label="Image" onClick={props.onImage}>
        <Icon path="M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5M9 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" stroke />
      </ToolButton>
      <ToolButton label="Divider" onClick={props.onDivider}>
        <Icon path="M4 12h16" stroke />
      </ToolButton>
    </div>
  );
}

function Icon({ path, stroke }: { path: string; stroke?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : "none"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function TextIcon({ children }: { children: ReactNode }) {
  return <span className="admin-mdtoolbar__txt">{children}</span>;
}

// ── Tabs ──────────────────────────────────────────────────────────────────

function Tabs({
  mode,
  canSplit,
  onChange,
}: {
  mode: Mode;
  canSplit: boolean;
  onChange: (m: Mode) => void;
}) {
  const tabs: { key: Mode; label: string }[] = [
    { key: "write", label: "Write" },
    { key: "preview", label: "Preview" },
    ...(canSplit ? [{ key: "split" as Mode, label: "Split" }] : []),
  ];
  return (
    <div className="admin-mdtabs" role="tablist" aria-label="Editor view">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={mode === t.key}
          className={`admin-mdtabs__tab${mode === t.key ? " is-active" : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Slash menu ─────────────────────────────────────────────────────────────

function SlashMenu({
  items,
  index,
  onPick,
  onHover,
}: {
  items: SlashItem[];
  index: number;
  onPick: (item: SlashItem) => void;
  onHover: (i: number) => void;
}) {
  return (
    <ul className="admin-slashmenu" role="listbox" aria-label="Insert block">
      {items.map((it, i) => (
        <li key={it.key} role="option" aria-selected={i === index}>
          <button
            type="button"
            className={`admin-slashmenu__item${i === index ? " is-active" : ""}`}
            // Prevent the textarea losing focus before the click handler runs.
            onMouseDown={(e) => {
              e.preventDefault();
              onPick(it);
            }}
            onMouseEnter={() => onHover(i)}
          >
            <span className="admin-slashmenu__label">{it.label}</span>
            <span className="admin-slashmenu__hint">{it.hint}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
