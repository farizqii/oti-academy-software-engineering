"use client";

import { type FormEvent, useState } from "react";

import type { CreateNoteInput, Note } from "@/types/note";

type NoteFormProps = {
  editingNote: Note | null;
  isSubmitting: boolean;
  submitError: string | null;

  onSubmit: (input: CreateNoteInput) => Promise<boolean>;

  onCancelEdit: () => void;
};

export function NoteForm({
  editingNote,
  isSubmitting,
  submitError,
  onSubmit,
  onCancelEdit,
}: NoteFormProps) {
  // 1. Initialize state directly from the prop
  const [title, setTitle] = useState(editingNote?.title ?? "");
  const [content, setContent] = useState(editingNote?.content ?? "");
  const [clientError, setClientError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);

    if (!title.trim()) {
      setClientError("Judul tidak boleh kosong.");

      return;
    }

    const success = await onSubmit({
      title: title.trim(),
      content: content.trim(),
    });

    if (success && !editingNote) {
      setTitle("");
      setContent("");
    }
  }

  const formTitle = editingNote ? "Edit Note" : "Tambah Note";

  const submitLabel = editingNote ? "Simpan Perubahan" : "Tambah Note";

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <p className="text-xs font-bold tracking-wide text-blue-700 uppercase">
        {editingNote ? "Update mode" : "Create mode"}
      </p>

      <h2 className="mt-3 text-xl font-semibold text-slate-950">{formTitle}</h2>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Title
          <input
            className="rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
            disabled={isSubmitting}
            maxLength={100}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Contoh: Belajar CRUD"
            value={title}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Content
          <textarea
            className="rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
            disabled={isSubmitting}
            maxLength={1000}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Tuliskan isi note"
            rows={6}
            value={content}
          />
        </label>

        {(clientError || submitError) && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {clientError ?? submitError}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Menyimpan..." : submitLabel}
          </button>

          {editingNote && (
            <button
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 disabled:opacity-60"
              disabled={isSubmitting}
              onClick={onCancelEdit}
              type="button"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
