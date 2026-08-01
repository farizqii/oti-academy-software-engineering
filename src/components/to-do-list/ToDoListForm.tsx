"use client";

import { type FormEvent, useState } from "react";
import type { CreateTodoInput } from "@/types/todo";

type TodoFormProps = {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: (input: CreateTodoInput) => Promise<boolean>;
};

export function TodoForm({
  isSubmitting,
  submitError,
  onSubmit,
}: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);

    if (!title.trim()) {
      setClientError("Judul tidak boleh kosong.");
      return;
    }

    const success = await onSubmit({ title: title.trim() });
    if (success) {
      setTitle("");
    }
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100"
        disabled={isSubmitting}
        maxLength={200}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Tambah to-do baru..."
        value={title}
      />
      <button
        className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "..." : "Tambah"}
      </button>
      {(clientError || submitError) && (
        <p className="text-sm text-red-700">{clientError ?? submitError}</p>
      )}
    </form>
  );
}
