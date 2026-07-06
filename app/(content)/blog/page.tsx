import type { Metadata } from "next";
import Link from "next/link";
import content from "@/lib/pocketContent.json";

export const metadata: Metadata = {
  title: "Blog - Pocket Fit",
  description:
    "Smarter training, AI fitness, and getting real results - from the Pocket Fit team.",
};

export default function BlogIndex() {
  const posts = content.blog;
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">
          Blog
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Train smarter
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-stone-500">
          AI fitness, adaptive training, and getting real results.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md"
          >
            {p.image && (
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-[family-name:var(--font-fraunces)] text-lg font-semibold leading-snug text-stone-900 group-hover:text-violet-700">
                {p.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500">
                {p.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-violet-700">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
