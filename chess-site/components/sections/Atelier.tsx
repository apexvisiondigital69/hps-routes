export function Atelier() {
  return (
    <section id="atelier" className="bg-bone py-28 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ink/60">The Atelier</p>
            <h2 className="mt-6 font-display text-5xl leading-tight md:text-6xl">
              Sialkot, since 1968.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/75">
              A courtyard workshop with four benches, two kilns, and a single
              window that faces north. We have made exactly one thing, very
              slowly, for fifty-seven years.
            </p>
            <p className="mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm">
              Book a private visit
              <span>&rarr;</span>
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-gradient-to-b from-[#3a2014] to-[#1a1613]" />
              <div className="mt-10 aspect-[3/4] bg-gradient-to-b from-burgundy to-[#2a0d0e]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
