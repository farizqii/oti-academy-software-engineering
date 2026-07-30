"use client";

import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "@/lib/notes-api";
import type { CreateNoteInput, Note } from "@/types/note";
import { NoteCard } from "./NoteCard";
import { NoteForm } from "./NoteForm";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Terjadi kesalahan yang tidak diketahui.";
}

export function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // State baru untuk memicu reload
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchNotes() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await getNotes();
        if (isMounted) {
          setNotes(data);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(getErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchNotes();

    // Cleanup function untuk mencegah state update jika komponen di-unmount
    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]); // Effect akan berjalan ulang jika reloadTrigger berubah

  // Fungsi untuk tombol "Coba Lagi"
  function handleRetry() {
    setReloadTrigger((prev) => prev + 1);
  }

  async function handleSubmit(input: CreateNoteInput): Promise<boolean> {
    setIsSubmitting(true);
    setSubmitError(null);
    setActionError(null);

    try {
      if (editingNote) {
        const updated = await updateNote(editingNote.id, input);
        setNotes((currentNotes) =>
          currentNotes.map((note) => (note.id === updated.id ? updated : note)),
        );
        setEditingNote(null);
      } else {
        const created = await createNote(input);
        setNotes((currentNotes) => [created, ...currentNotes]);
      }
      return true;
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(note: Note) {
    setSubmitError(null);
    setActionError(null);
    setEditingNote(note);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingNote(null);
    setSubmitError(null);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Yakin ingin menghapus note ini?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setActionError(null);

    try {
      await deleteNote(id);
      setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
      if (editingNote?.id === id) {
        setEditingNote(null);
      }
    } catch (error) {
      setActionError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <NoteForm
        key={editingNote ? editingNote.id : "create-new"}
        editingNote={editingNote}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <section>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Daftar Notes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Data diambil dari PostgreSQL.
            </p>
          </div>

          {!isLoading && !loadError && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {notes.length} notes
            </span>
          )}
        </div>

        {actionError && (
          <div
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {actionError}
          </div>
        )}

        {isLoading ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-slate-700">Memuat notes...</p>
            <p className="mt-2 text-sm text-slate-500">
              Mengambil data dari API.
            </p>
          </div>
        ) : loadError ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h3 className="font-semibold text-red-800">Notes gagal dimuat</h3>
            <p className="mt-2 text-sm text-red-700">{loadError}</p>
            <button
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white"
              onClick={handleRetry} // Gunakan handleRetry di sini
              type="button"
            >
              Coba Lagi
            </button>
          </div>
        ) : notes.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="font-semibold text-slate-900">Belum ada notes</h3>
            <p className="mt-2 text-sm text-slate-500">
              Gunakan form untuk membuat note pertama.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {notes.map((note) => (
              <NoteCard
                isDeleting={deletingId === note.id}
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
