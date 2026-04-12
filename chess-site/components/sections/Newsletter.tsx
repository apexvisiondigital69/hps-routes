export function Newsletter() {
  return (
    <section id="journal" className="bg-ivory py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
        <p className="eyebrow text-ink/60">The Journal</p>
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
          Occasional dispatches from the workshop.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-ink/70">
          Four letters a year. New editions, restoration notes, and the
          occasional photograph of Imran&rsquo;s cat, Rani.
        </p>

        <form className="mx-auto mt-10 flex max-w-md items-center border-b border-ink/40 pb-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="eyebrow text-ink transition hover:opacity-60"
          >
            Subscribe &rarr;
          </button>
        </form>
      </div>
    </section>
  );
}
