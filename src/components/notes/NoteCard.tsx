"use client";

import type { Note } from "@/types/note";

type NoteCardProps = {
  note: Note;
  isDeleting: boolean;

  onEdit: (note: Note) => void;

  onDelete: (id: string) => void;
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export function NoteCard({
  note,
  isDeleting,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-blue-700 uppercase">
            Commission
          </p>

          <h2 className="mt-2 text-lg font-semibold text-slate-950">
            {note.title}
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500">
          {note.id.slice(0, 8)}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {note.content || "No Content."}
      </p>

      <p className="mt-5 text-xs text-slate-400">
        Updated {formatDate(note.updatedAt)}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          onClick={() => onEdit(note)}
          type="button"
        >
          Edit
        </button>

        <button
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isDeleting}
          onClick={() => onDelete(note.id)}
          type="button"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
