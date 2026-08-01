import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const [totalNotes, totalTodos] = await Promise.all([
    prisma.note.count({ where: { userId } }),
    prisma.todo.count({ where: { userId } }),
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm font-semibold text-blue-700">
          Personal Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">Dashboard</h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Notes</p>
            <p className="mt-3 text-4xl font-bold text-slate-950">
              {totalNotes}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total To-Do</p>
            <p className="mt-3 text-4xl font-bold text-slate-950">
              {totalTodos}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
