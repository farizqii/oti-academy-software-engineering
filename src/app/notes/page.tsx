import type { Metadata } from "next";

import { NotesClient } from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: "Notes",
};

export default function NotesPage() {
  return (
    <main className="min-h-[calc(100vh-129px)] bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-700">Full-Stack CRUD</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Notes
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Buat, lihat, ubah, dan hapus notes yang tersimpan di PostgreSQL.
          </p>
        </div>

        <NotesClient />
      </section>
    </main>
  );
}
