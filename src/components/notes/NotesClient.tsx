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
  return "An unknown error occurred.";
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

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

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
    const confirmed = window.confirm(
      "Are you sure that you want to remove this commission?",
    );
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
              List of Commissions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              All datas are taken from PostgreSQL
            </p>
          </div>

          {!isLoading && !loadError && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {notes.length} commissions
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
            <p className="font-medium text-slate-700">Loading Commission...</p>
            <p className="mt-2 text-sm text-slate-500">
              Fetching data from the API.
            </p>
          </div>
        ) : loadError ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h3 className="font-semibold text-red-800">
              Commission failed to load.
            </h3>
            <p className="mt-2 text-sm text-red-700">{loadError}</p>
            <button
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white"
              onClick={handleRetry} // Gunakan handleRetry di sini
              type="button"
            >
              Try Again
            </button>
          </div>
        ) : notes.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="font-semibold text-slate-900">
              No commissions yet.
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Use the form to create your first commission.
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
