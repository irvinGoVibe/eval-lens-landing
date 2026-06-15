"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Native HTML5 drag-and-drop upload zone with local preview and an
 * indeterminate progress indicator. No third-party dropzone dependency.
 *
 * The actual upload is delegated to a server action passed in via `onUpload`
 * (so secrets / the service_role admin client never reach the client bundle).
 * A plain `<input type="file">` and the manual URL field around it remain as
 * fallbacks when DnD is unavailable.
 */

export type DropzoneUploadResult = { url: string } | { error: string };

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB safety ceiling

export function ImageDropzone({
  onUpload,
  accept = "image/*,video/*",
  multiple = false,
  label = "Drag & drop a file here, or",
  hint,
}: {
  /** Upload a single file via a server action; returns the public URL. */
  onUpload: (file: File) => Promise<DropzoneUploadResult>;
  accept?: string;
  /** Allow selecting / dropping several files (e.g. a gallery). */
  multiple?: boolean;
  label?: string;
  hint?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ url: string; remoteUrl: string } | null>(
    null,
  );

  // Keep the latest blob preview URL in a ref so the unmount cleanup can revoke
  // it without re-subscribing on every preview change.
  const previewUrlRef = useRef("");
  useEffect(() => {
    previewUrlRef.current = preview?.url ?? "";
  }, [preview]);
  useEffect(() => {
    return () => {
      const url = previewUrlRef.current;
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    };
  }, []);

  const isAcceptedType = useCallback((file: File) => {
    return file.type.startsWith("image/") || file.type.startsWith("video/");
  }, []);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;
      const selected = multiple ? list : [list[0]];

      for (const file of selected) {
        if (!isAcceptedType(file)) {
          setError(`Unsupported file type: ${file.type || "unknown"}. Use an image or video.`);
          return;
        }
        if (file.size > MAX_BYTES) {
          setError("File is too large (max 50 MB).");
          return;
        }
      }

      setError("");
      setBusy(true);
      try {
        let prevLocalUrl = "";
        for (const file of selected) {
          const localUrl = URL.createObjectURL(file);
          const result = await onUpload(file);
          if ("error" in result) {
            URL.revokeObjectURL(localUrl);
            setError(result.error || "Upload failed.");
            return;
          }
          // Release the intermediate blob URL from the previous iteration so a
          // multi-file batch keeps only the latest preview alive instead of
          // leaking N−1 object URLs.
          if (prevLocalUrl) URL.revokeObjectURL(prevLocalUrl);
          prevLocalUrl = localUrl;
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return { url: localUrl, remoteUrl: result.url };
          });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed.");
      } finally {
        setBusy(false);
      }
    },
    [isAcceptedType, multiple, onUpload],
  );

  return (
    <div
      className={`admin-dropzone${over ? " is-over" : ""}`}
      aria-busy={busy}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (e.dataTransfer.files?.length) void handleFiles(e.dataTransfer.files);
      }}
    >
      <div className="admin-dropzone__cta">
        <span className="admin-dropzone__hint">{label}</span>
        <label htmlFor={inputId} className="admin-btn">
          {busy ? "Uploading…" : "Choose file"}
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            hidden
            disabled={busy}
            onChange={(e) => {
              // Copy out of the live FileList *before* resetting value — setting
              // value="" clears e.target.files, which would otherwise empty the
              // reference and silently drop the upload.
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              if (files.length) void handleFiles(files);
            }}
          />
        </label>
      </div>

      {hint && <span className="admin-dropzone__hint">{hint}</span>}

      {busy && (
        <div className="admin-progress" role="progressbar" aria-label="Uploading" />
      )}

      {error && <p className="admin-error">{error}</p>}

      {preview && (
        <div className="admin-dropzone__preview">
          {preview.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="admin-dropzone__thumb" src={preview.url} alt="Upload preview" />
          ) : null}
          <span className="admin-dropzone__url">{preview.remoteUrl}</span>
        </div>
      )}
    </div>
  );
}
