import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { TodosClient } from "@/components/to-do-list/ToDoListClient";

export const metadata: Metadata = { title: "To-Do" };

export default async function TodosPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm font-semibold text-blue-700">User-Owned Data</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">To-Do List</h1>
        <p className="mt-2 text-slate-600">
          Setiap user hanya dapat mengakses to-do miliknya.
        </p>
        <TodosClient />
      </section>
    </main>
  );
}
