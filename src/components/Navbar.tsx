import Link from "next/link";

export function Navbar(){
    return(
    <nav className="border-b bg-gray-500">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-bold">
                OTI Dashboard
            </Link>
            
            <div className="flex gap-4 text-sm">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/notes">Notes</Link>
            </div>
        </div>
    </nav>
    );
}