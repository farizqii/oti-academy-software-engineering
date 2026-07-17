
export default function DashboardPage(){
    return(
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-5xl px-4 py-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-600">
                    Ringkasan aktivitas produktivitas kamu akan tampil
                    di sini.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Notes
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Tasks Done
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Pending Tasks
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            0
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}



