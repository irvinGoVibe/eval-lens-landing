"use client";

import { useState } from "react";
import type { AdminLoopPost } from "@/lib/cms/admin-queries";
import { ImageDropzone } from "./ImageDropzone";
import { uploadLoopMediaAction } from "@/app/admin/blog/reposts/actions";

const ACCENTS = ["violet", "cyan", "aqua", "orange"];

export function LoopForm({
  action,
  post,
}: {
  action: (formData: FormData) => void | Promise<void>;
  post?: AdminLoopPost | null;
}) {
  const p = post ?? null;
  const editing = Boolean(p);
  const [cover, setCover] = useState(p?.cover ?? "");
  const [video, setVideo] = useState(p?.video ?? "");
  const [photos, setPhotos] = useState((p?.photos ?? []).join("\n"));

  function appendPhoto(url: string) {
    setPhotos((cur) => (cur.trim() ? `${cur.replace(/\n+$/, "")}\n${url}` : url));
  }

  return (
    <form className="admin-form" action={action}>
      <section className="admin-section">
        <h2 className="admin-section__title">Details</h2>
      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-id">ID</label>
          <input
            id="l-id"
            name="id"
            className="admin-input"
            defaultValue={p?.id ?? ""}
            required
            readOnly={editing}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="l-kind">Kind</label>
          <select
            id="l-kind"
            name="kind"
            className="admin-select"
            defaultValue={p?.kind ?? "photo"}
          >
            <option value="photo">photo</option>
            <option value="video">video</option>
          </select>
        </div>
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-author">Author</label>
          <input
            id="l-author"
            name="author"
            className="admin-input"
            defaultValue={p?.author ?? ""}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="l-initials">Initials</label>
          <input
            id="l-initials"
            name="initials"
            className="admin-input"
            defaultValue={p?.initials ?? ""}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="l-caption">Caption</label>
        <input
          id="l-caption"
          name="caption"
          className="admin-input"
          defaultValue={p?.caption ?? ""}
        />
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-accent">Accent</label>
          <select
            id="l-accent"
            name="accent"
            className="admin-select"
            defaultValue={p?.accent ?? ACCENTS[0]}
          >
            {ACCENTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="l-date">Date</label>
          <input
            id="l-date"
            name="date"
            type="date"
            className="admin-input"
            defaultValue={p?.date ?? ""}
          />
        </div>
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Media</h2>
      <div className="admin-field">
        <label htmlFor="l-cover">Cover</label>
        <ImageDropzone
          accept="image/*"
          label="Drag & drop a cover image here, or"
          hint="Uploads to Storage (bento) and fills the URL below; or enter a URL manually."
          onUpload={async (file) => {
            const fd = new FormData();
            fd.set("file", file);
            const result = await uploadLoopMediaAction("bento", fd);
            if ("url" in result) setCover(result.url);
            return result;
          }}
        />
        <input
          id="l-cover"
          name="cover"
          className="admin-input"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="l-video">Video (for kind=video)</label>
        <ImageDropzone
          accept="video/*"
          label="Drag & drop a video here, or"
          hint="Uploads to Storage (video) and fills the URL below; or enter a URL manually."
          onUpload={async (file) => {
            const fd = new FormData();
            fd.set("file", file);
            const result = await uploadLoopMediaAction("video", fd);
            if ("url" in result) setVideo(result.url);
            return result;
          }}
        />
        <input
          id="l-video"
          name="video"
          className="admin-input"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="l-photos">Gallery photos (one URL per line)</label>
        <ImageDropzone
          accept="image/*"
          multiple
          label="Drag & drop gallery images here, or"
          hint="Each upload appends a URL line below; multiple files allowed."
          onUpload={async (file) => {
            const fd = new FormData();
            fd.set("file", file);
            const result = await uploadLoopMediaAction("photos", fd);
            if ("url" in result) appendPhoto(result.url);
            return result;
          }}
        />
        <textarea
          id="l-photos"
          name="photos"
          className="admin-textarea"
          style={{ minHeight: 120 }}
          value={photos}
          onChange={(e) => setPhotos(e.target.value)}
        />
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Source</h2>
      <div className="admin-field">
        <label htmlFor="l-href">Source post link</label>
        <input
          id="l-href"
          name="href"
          className="admin-input"
          defaultValue={p?.href ?? ""}
        />
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Publish</h2>
      <div className="admin-field" style={{ maxWidth: 220 }}>
        <label htmlFor="l-status">Status</label>
        <select
          id="l-status"
          name="status"
          className="admin-select"
          defaultValue={p?.status ?? "draft"}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
      </section>

      <div className="admin-savebar">
        <button type="submit" className="admin-btn admin-btn--primary">
          Save
        </button>
      </div>
    </form>
  );
}
