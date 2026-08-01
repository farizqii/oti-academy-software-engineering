import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-slate-600">
            OmahTI Academy&apos;s Software Engineering Final Project
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Artist&apos;s Commissions & Productivity Manager.
          </h1>

          <p className="mt-4 text-slate-600">
            Say goodbye to chaotic spreadsheets and scattered DMs. This
            all-in-one platform empowers creators to handle client requests,
            monitor deadlines, and organize their workflow from the initial
            sketch to final delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-slate-900 px-4 py-2 text-white"
            >
              Open Dashboard
            </Link>

            <Link
              href="/notes"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900"
            >
              View Commissions
            </Link>

            <Link
              href="/to-do-list"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900"
            >
              View To-do List
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
