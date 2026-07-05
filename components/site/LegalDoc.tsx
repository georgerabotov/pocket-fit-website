// Renders a legal document from the migrated paragraph list. Splits inline
// "- " runs into bullet lists and treats short numbered lines as headings.

function Block({ text, i }: { text: string; i: number }) {
  // bullet run: "Lead- a- b- c"
  if ((text.match(/-\s/g) || []).length >= 2 && /\S-\s/.test(text)) {
    const parts = text.split(/-\s+/);
    const lead = parts.shift()?.trim();
    return (
      <div key={i} className="mt-5">
        {lead && <p className="text-stone-700">{lead}</p>}
        <ul className="mt-2 list-disc space-y-1 pl-6 text-stone-600">
          {parts.map((p, j) => (
            <li key={j}>{p.trim()}</li>
          ))}
        </ul>
      </div>
    );
  }
  // short numbered/section header line
  if (/^\d+\.\s+[A-Z]/.test(text) && text.length < 60) {
    return (
      <h2
        key={i}
        className="mt-9 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-stone-900"
      >
        {text}
      </h2>
    );
  }
  return (
    <p key={i} className="mt-4 leading-relaxed text-stone-600">
      {text}
    </p>
  );
}

export function LegalDoc({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        {title}
      </h1>
      <div className="mt-8">
        {paragraphs.map((p, i) => (
          <Block key={i} text={p} i={i} />
        ))}
      </div>
    </article>
  );
}
