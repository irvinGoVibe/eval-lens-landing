// Pure textarea-selection helpers for the Markdown body editor. No React, no
// DOM access beyond the plain {value, selectionStart, selectionEnd} contract —
// so they're trivially testable and shared by toolbar / hotkeys / slash-menu /
// media insertion. Each helper returns the next `value` plus the selection to
// restore, never mutating the input.

export interface EditState {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export interface EditResult {
  value: string;
  /** Caret/selection to restore after applying `value` to the textarea. */
  selectionStart: number;
  selectionEnd: number;
}

/**
 * Wrap the current selection in `before`/`after`. If nothing is selected the
 * markers are inserted and the caret lands between them (or in the placeholder,
 * if given) so the user can type the content immediately.
 */
export function wrapSelection(
  s: EditState,
  before: string,
  after: string,
  placeholder = "",
): EditResult {
  const { value, selectionStart, selectionEnd } = s;
  const selected = value.slice(selectionStart, selectionEnd);
  const inner = selected || placeholder;
  const next =
    value.slice(0, selectionStart) +
    before +
    inner +
    after +
    value.slice(selectionEnd);
  const innerStart = selectionStart + before.length;
  return {
    value: next,
    selectionStart: innerStart,
    selectionEnd: innerStart + inner.length,
  };
}

/**
 * Prefix every line touched by the selection with `prefix`. For ordered lists
 * pass `ordered` to renumber (1., 2., 3.) instead of a static prefix.
 */
export function prefixLines(
  s: EditState,
  prefix: string,
  ordered = false,
): EditResult {
  const { value, selectionStart, selectionEnd } = s;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  let lineEnd = value.indexOf("\n", selectionEnd);
  if (lineEnd === -1) lineEnd = value.length;
  // When the selection ends exactly at a line break, don't pull in the next line.
  if (selectionEnd > selectionStart && value[selectionEnd - 1] === "\n") {
    lineEnd = selectionEnd - 1;
  }

  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  const prefixed = lines
    .map((line, i) => (ordered ? `${i + 1}. ` : prefix) + line)
    .join("\n");
  const next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
  return {
    value: next,
    selectionStart: lineStart,
    selectionEnd: lineStart + prefixed.length,
  };
}

/**
 * Insert `text` at the caret, replacing any selection. `caretOffset` (relative
 * to the inserted text) positions the caret afterwards; defaults to the end of
 * the insertion. `selectLength` extends the result into a selection.
 */
export function insertAtCursor(
  s: EditState,
  text: string,
  caretOffset = text.length,
  selectLength = 0,
): EditResult {
  const { value, selectionStart, selectionEnd } = s;
  const next =
    value.slice(0, selectionStart) + text + value.slice(selectionEnd);
  const caret = selectionStart + caretOffset;
  return {
    value: next,
    selectionStart: caret,
    selectionEnd: caret + selectLength,
  };
}

/**
 * Insert a block-level snippet, guaranteeing blank-line separation from
 * surrounding prose so the Markdown parses as its own block. Caret lands at the
 * end of the inserted snippet.
 */
export function insertBlock(s: EditState, snippet: string): EditResult {
  const { value, selectionStart } = s;
  const beforeChar = value.slice(0, selectionStart);
  const needLeading =
    selectionStart > 0 && !beforeChar.endsWith("\n\n")
      ? beforeChar.endsWith("\n")
        ? "\n"
        : "\n\n"
      : "";
  const afterChar = value.slice(s.selectionEnd);
  const needTrailing = afterChar.startsWith("\n") || afterChar === "" ? "" : "\n\n";
  const text = needLeading + snippet + needTrailing;
  return insertAtCursor(s, text, text.length);
}

/**
 * Replace a unique placeholder token anywhere in `value` with `replacement`.
 * Used for media uploads: the in-flight placeholder carries a unique token, so
 * edits elsewhere during the upload never shift or clobber the swap. Returns
 * `null` if the token is gone (user deleted the placeholder mid-upload).
 */
export function replaceToken(
  value: string,
  token: string,
  replacement: string,
): string | null {
  const idx = value.indexOf(token);
  if (idx === -1) return null;
  return value.slice(0, idx) + replacement + value.slice(idx + token.length);
}

/** The inline placeholder shown in the body while an upload is in flight. */
export function uploadingPlaceholder(token: string): string {
  return `![uploading… #${token}]()`;
}

/** Build the final media snippet for an uploaded file URL. */
export function mediaSnippet(url: string, isVideo: boolean): string {
  return isVideo ? `::video{src="${url}"}` : `![](${url})`;
}

/** Generate a short, collision-resistant token for placeholders. */
export function makeToken(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export interface ContentStats {
  words: number;
  chars: number;
  readMinutes: number;
}

/** Word/char counts + a reading-time estimate (~225 wpm), purely informative. */
export function contentStats(value: string): ContentStats {
  const trimmed = value.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    words,
    chars: value.length,
    readMinutes: Math.max(1, Math.round(words / 225)),
  };
}

/**
 * Decide whether a `/` just typed at `caret` should open the slash-menu: only
 * at the very start of a line or right after whitespace (so `and/or` mid-word
 * never triggers it). Returns the index of the `/` when eligible, else -1.
 */
export function slashTriggerIndex(value: string, caret: number): number {
  const slashIdx = caret - 1;
  if (slashIdx < 0 || value[slashIdx] !== "/") return -1;
  const prev = slashIdx === 0 ? "\n" : value[slashIdx - 1];
  if (prev === "\n" || prev === " " || prev === "\t") return slashIdx;
  return -1;
}
