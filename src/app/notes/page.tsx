import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { NotesClient } from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <main className="min-h-[calc(100vh-129px)] bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm font-semibold text-blue-700">
          User-Owned Commissions
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          My Commissions
        </h1>

        <NotesClient />
      </section>
    </main>
  );
}
