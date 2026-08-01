import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="order-1 relative flex aspect-square w-full max-w-md items-center justify-center rounded-2xl border border-primary-action/20 bg-primary-action/5 shadow-lg backdrop-blur-sm p-8">
            <Image
              src="/image-16-removebg-preview.png"
              alt="ArtFlows Logo"
              fill
              className="object-contain p-6"
            />
          </div>

          <div className="order-2 max-w-2xl">
            <p className="mb-3 text-sm font-medium text-slate-600">
              OmahTI Academy&apos;s Software Engineering Final Project
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome to{" "}
              <span className="text-[#5465FF] font-extrabold">ArtFlows</span>
            </h1>

            <p className="mt-4 text-slate-600">
              This all-in-one productivity platform organizes creators to handle
              client requests, monitor deadlines, and organize their workflow
              from the initial sketch to final delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#5465FF] px-4 py-2 text-[#FFFFFF] font-bold border border-white shadow"
              >
                Open Dashboard
              </Link>

              <Link
                href="/notes"
                className="rounded-xl bg-[#BFD7FF] px-4 py-2 text-[#5465FF] font-bold border border-white shadow"
              >
                View Commissions
              </Link>

              <Link
                href="/to-do-list"
                className="rounded-xl bg-[#BFD7FF] px-4 py-2 text-[#5465FF] font-bold border border-white shadow"
              >
                View To-do List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
