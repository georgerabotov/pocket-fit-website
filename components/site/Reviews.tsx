"use client";

/* Two-row App Store review marquee — top row scrolls right→left, bottom row
   left→right, both pause on hover. Ported from the standalone mockup. */

type Review = { t: string; b: string; n: string; h: string; g: string };

const A: Review[] = [
  { t: "10/10 gym app", b: "Absolutely love what Pocket Fit offers, especially being able to share my gym wins of the day — there's no other app like it. It's so easy to get a quick workout made, the AI planner is super helpful. Great job!!", n: "frhfitt", h: "16 Mar", g: "linear-gradient(135deg,#7472E5,#3F3DBA)" },
  { t: "Absolute game-changer", b: "Had to train at home without the equipment I needed. Instead of skipping, I asked the chatbot and it replaced the exercise just for that session. Super clean and intuitive, and I love the dark mode themes.", n: "Gabriela Ev", h: "20 Jan", g: "linear-gradient(135deg,#5CC0BF,#2E9E8F)" },
  { t: "Best workout app on the market!", b: "Very simple and easy to use. It takes away the hard work of creating a workout schedule with the AI chatbot, which can instantly create one for you. Great for all levels of fitness. Would highly recommend!", n: "Vanessa_Gill", h: "30 Mar", g: "linear-gradient(135deg,#F2A93B,#E07B39)" },
  { t: "Game changer", b: "I've used a lot of different fitness apps, both paid and free, and this is hands down miles above all the others. I can't recommend this app enough — try it out, you won't be disappointed.", n: "Josh-uk", h: "16 Mar", g: "linear-gradient(135deg,#6260E0,#4D4BC0)" },
  { t: "Great app", b: "GREAT workout app! Helps me stay organized and accountable. I really enjoy how easy it is to navigate as well. So far everything is great with this app! Great download.", n: "Toddgainzz", h: "21 Mar", g: "linear-gradient(135deg,#5CC0BF,#3AA0C0)" },
];

const B: Review[] = [
  { t: "Honestly impressed!", b: "Absolutely amazing. What I like most is how personalised it is — the app generates workouts specifically tailored to your needs, goals and level. It truly feels like having a personal trainer in your pocket.", n: "Vanessa Kyosina", h: "25 Jan", g: "linear-gradient(135deg,#E0607F,#C03F6A)" },
  { t: "The only tracker you'll ever need", b: "So enjoyable to log and track your progress. I use it for my powerlifting workouts and having everything modular and easy to edit is amazing. Seeing historical data and sharing sessions to social is a nice touch!", n: "tsaneviv", h: "16 Feb", g: "linear-gradient(135deg,#6260E0,#8A5CE0)" },
  { t: "Highly recommend", b: "Super cool tracker app! I had a program already — all I did was put my notes in the chat and it created the program for me, including weight, reps, sets, everything. Very simple and straightforward to use.", n: "Pocket-Squats-User", h: "1 Apr", g: "linear-gradient(135deg,#F2A93B,#E8862B)" },
  { t: "Solid!!", b: "Really solid. Clean design, easy to use, and the workouts actually make sense instead of being overcomplicated. Great for staying consistent without feeling overwhelmed. Definitely recommend.", n: "dslavov23", h: "21 Jan", g: "linear-gradient(135deg,#7472E5,#5A57D8)" },
  { t: "Best fitness app", b: "My fitness journey is so much better ever since I started using this app. It keeps me consistent and the progress tracking genuinely motivates me to keep showing up.", n: "prettypreeta", h: "19 Mar", g: "linear-gradient(135deg,#5CC0BF,#48A0B8)" },
];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
    </svg>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <div className="w-[340px] flex-none rounded-[18px] border border-stone-200 bg-white p-5 shadow-[0_16px_32px_-26px_rgba(40,36,90,0.4)]">
      <div className="mb-2.5 flex items-center gap-[3px] text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
        <span className="ml-auto text-xs font-bold text-stone-400">{r.h}</span>
      </div>
      <h4 className="mb-1.5 font-[family-name:var(--font-fraunces)] text-[15.5px] font-semibold tracking-tight text-stone-900">
        {r.t}
      </h4>
      <p className="line-clamp-3 text-sm font-medium leading-relaxed text-stone-600">
        {r.b}
      </p>
      <div className="mt-4 flex items-center gap-2.5">
        <div
          className="grid size-[30px] flex-none place-items-center rounded-full text-xs font-bold text-white"
          style={{ background: r.g }}
        >
          {r.n[0].toUpperCase()}
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-bold text-stone-900">{r.n}</div>
          <div className="text-[11.5px] font-semibold text-stone-400">App Store · 5.0</div>
        </div>
      </div>
    </div>
  );
}

function Row({ data, dir }: { data: Review[]; dir: "l" | "r" }) {
  return (
    <div className="flex w-max">
      <div className={`flex gap-5 pl-5 ${dir === "l" ? "rv-anim-l" : "rv-anim-r"}`}>
        {[...data, ...data].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section className="overflow-hidden py-16">
      <div className="mx-auto mb-11 max-w-2xl px-5 text-center">
        <p
          data-reveal
          className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-violet-700"
        >
          Loved by lifters
        </p>
        <h2
          data-reveal
          style={{ transitionDelay: "80ms" }}
          className="reveal mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
        >
          Thousands of five-star workouts
        </h2>
      </div>
      <div className="rv-pause flex flex-col gap-5 [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        <Row data={A} dir="l" />
        <Row data={B} dir="r" />
      </div>
    </section>
  );
}
