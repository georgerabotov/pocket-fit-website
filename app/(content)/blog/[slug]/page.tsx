import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import content from "@/lib/pocketContent.json";

type Params = { slug: string };

export function generateStaticParams() {
  return content.blog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = content.blog.find((p) => p.slug === slug);
  if (!post) return { title: "Blog — Pocket Fit" };
  return { title: `${post.title} — Pocket Fit`, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = content.blog.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-16 sm:py-20">
      <Link
        href="/blog"
        className="text-sm font-semibold text-violet-700 hover:underline"
      >
        ← All articles
      </Link>

      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-500">
        {post.description}
      </p>

      {post.image && (
        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mt-8 border-t border-stone-200 pt-8">
        {post.paragraphs.map((p, i) => (
          <p key={i} className="mt-4 leading-relaxed text-stone-700">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-stone-900 p-7 text-center">
        <p className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">
          Train smarter with Pocket Fit
        </p>
        <a
          href="https://apps.apple.com/gb/app/pocket-squats/id6748518785"
          className="mt-4 inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-violet-400"
        >
          Download the app
        </a>
      </div>
    </article>
  );
}
