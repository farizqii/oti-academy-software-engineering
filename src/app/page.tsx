
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-slate-600">
            OTI Academy Software Engineering
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Build your own productivity dashboard.
          </h1>

          <p className="mt-4 text-slate-600">
            Belajar membangun aplikasi web modern dari UI,
            API, database, authentication, hingga deployment.
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
              View Notes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


