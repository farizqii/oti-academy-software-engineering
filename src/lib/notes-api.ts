import type { ApiError, ApiSuccess } from "@/types/api";

import type { CreateNoteInput, Note, UpdateNoteInput } from "@/types/note";

async function readApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok) {
    throw new Error(payload.message || "Request gagal diproses.");
  }

  if (!("data" in payload)) {
    throw new Error("Response server tidak memiliki data.");
  }

  return payload.data;
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch("/api/notes", {
    method: "GET",
    cache: "no-store",
  });

  return readApiResponse<Note[]>(response);
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const response = await fetch("/api/notes", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(input),
  });

  return readApiResponse<Note>(response);
}

export async function updateNote(
  id: string,
  input: UpdateNoteInput,
): Promise<Note> {
  const response = await fetch(`/api/notes/${encodeURIComponent(id)}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(input),
  });

  return readApiResponse<Note>(response);
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await fetch(`/api/notes/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  return readApiResponse<Note>(response);
}
