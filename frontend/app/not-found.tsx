import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-red-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-300 bg-white/80 p-10 shadow-2xl shadow-red-950/10 backdrop-blur-sm">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
              404
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 md:text-lg">
              The page you are looking for does not exist.
              <br />
              Please check the link or return to the home page.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800"
              >
                Go Home
              </Link>
            </div>
          </section>

          <aside className="flex justify-center lg:justify-end">
            <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-3xl border border-slate-300 bg-slate-900 p-8 shadow-2xl shadow-red-950/20">
              <Image
                src="/vjti.png"
                alt="VJTI logo"
                width={280}
                height={280}
                className="h-auto w-full max-w-xs object-contain"
                priority
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
