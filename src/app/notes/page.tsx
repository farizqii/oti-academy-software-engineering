
const notes = [
    {
        id: 1,
        title: "Belajar Next.js",
        content: "Hari ini belajar routing dan layout.",
    },

    {
        id: 2,
        title: "Belajar Tailwind",
        content: "Membuat UI dashboard sederhana.",
    },
];

export default function NotesPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-5xl px-4 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                        Notes
                        </h1>

                        <p className="mt-2 text-slate-600">
                        Daftar notes sementara sebelum terhubung ke
                        database.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="w-fit rounded-xl bg-slate-900 px-4 py-2 text-white"
                    >
                        Add Note
                    </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {notes.map((note) => (
                        <div
                        key={note.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <h2 className="font-semibold text-slate-900">
                                {note.title}
                            </h2>

                            <p className="mt-2 text-sm text-slate-600">
                                {note.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}



