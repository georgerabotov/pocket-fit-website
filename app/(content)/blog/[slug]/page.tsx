import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import content from "@/lib/pocketContent.json";

type Params = { slug: string };

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  paragraphs?: string[];
  body?: string;
};

const posts = content.blog as unknown as BlogPost[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog - Pocket Fit" };
  return {
    title: `${post.title} - Pocket Fit`,
    description: post.description,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

/* ---- helpers for the markdown-based posts ---- */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function nodeText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (children && typeof children === "object" && "props" in children)
    return nodeText(
      (children as { props: { children?: React.ReactNode } }).props.children,
    );
  return "";
}

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2
      id={slugify(nodeText(children))}
      className="mt-14 scroll-mt-24 font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.7rem]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(nodeText(children))}
      className="mt-9 scroll-mt-24 text-lg font-semibold text-stone-900"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 leading-[1.75] text-stone-700">{children}</p>
  ),
  a: ({ href, children }) => {
    const external = !!href && /^https?:/.test(href);
    return (
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800"
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-900">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-stone-700 marker:text-stone-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-stone-600 marker:text-stone-400">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  hr: () => <hr className="mt-12 border-stone-200" />,
  em: ({ children }) => <em className="text-stone-500">{children}</em>,
};

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // build the table of contents from the ## headings in the markdown body
  const toc = post.body
    ? [...post.body.matchAll(/^## (.+)$/gm)].map((m) => ({
        text: m[1].trim(),
        id: slugify(m[1].trim()),
      }))
    : [];

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

      {/* Table of contents */}
      {toc.length > 1 && (
        <nav
          aria-label="Table of contents"
          className="mt-10 rounded-2xl border border-stone-200 bg-stone-50/70 p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
            In this article
          </p>
          <ol className="mt-4 space-y-2.5">
            {toc.map((t, i) => (
              <li key={t.id} className="flex gap-3 text-[15px] leading-snug">
                <span className="font-semibold text-violet-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${t.id}`}
                  className="font-medium text-stone-600 transition-colors hover:text-violet-700"
                >
                  {t.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Body */}
      {post.body ? (
        <div className="mt-4">
          <ReactMarkdown components={mdComponents}>{post.body}</ReactMarkdown>
        </div>
      ) : (
        <div className="mt-8 border-t border-stone-200 pt-8">
          {(post.paragraphs ?? []).map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-stone-700">
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-2xl bg-stone-900 p-7 text-center">
        <p className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-white">
          Train smarter with Pocket Fit
        </p>
        <a
          href="https://apps.apple.com/gb/app/pocket-squats/id6748518785"
          className="mt-4 inline-block rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-400"
        >
          Download the app
        </a>
      </div>
    </article>
  );
}
