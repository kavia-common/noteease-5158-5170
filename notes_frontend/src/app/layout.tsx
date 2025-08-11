import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NoteEase",
  description: "Modern, minimalistic note taking app",
};

// PUBLIC_INTERFACE
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-700 min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-[240px] bg-primary text-white flex-shrink-0 flex flex-col border-r border-slate-100">
            <div className="p-6 font-bold text-lg tracking-tight text-white flex items-center gap-2">
              <span className="rounded bg-accent px-2 py-1 text-white">📝</span>
              NoteEase
            </div>
            <nav className="flex flex-col px-4 gap-4 mt-2">
              <Link href="/" className="text-white font-medium hover:text-accent py-2">All notes</Link>
              <Link href="/new" className="text-white font-medium hover:text-accent py-2">New note</Link>
              <Link href="/search" className="text-white font-medium hover:text-accent py-2">Search</Link>
            </nav>
            <div className="mt-auto p-4 text-xs text-slate-400">Effortlessly manage notes</div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {/* Top bar */}
            <header className="w-full px-8 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="text-primary font-semibold text-[1.4rem] tracking-tight">My Notes</div>
              {/* Here you can add user profile, quick buttons, theme switch etc. */}
              <div className="flex items-center gap-3">
                <Link href="/new">
                  <button className="bg-accent text-white px-3 py-2 rounded hover:bg-primary transition">
                    + Create
                  </button>
                </Link>
              </div>
            </header>
            {/* Notes pages area */}
            <section className="flex-1 bg-white px-10 py-8">
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
