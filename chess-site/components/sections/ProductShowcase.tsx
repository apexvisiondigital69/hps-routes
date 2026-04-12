export function ProductShowcase() {
  return (
    <section id="set" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-24">
          {/* Left: gallery */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] w-full bg-bone">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="marble-board h-2/3 w-2/3 shadow-xl ring-1 ring-ink/10" />
              </div>
              <p className="eyebrow absolute bottom-6 left-6 text-ink/50">
                Plate 02 &mdash; The board, in repose
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="aspect-square bg-burgundy/90" />
              <div className="aspect-square bg-[#3a2014]" />
              <div className="aspect-square bg-bone ring-1 ring-ink/10" />
            </div>
          </div>

          {/* Right: copy */}
          <div className="md:col-span-5 md:pt-10">
            <p className="eyebrow text-ink/60">The Object</p>
            <h2 className="mt-6 font-display text-5xl leading-tight md:text-6xl">
              A heirloom, not a hobby.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-ink/75">
              Every Heritage Set is cut from a single block of Makrana onyx and
              Carrara cream, polished to a soft lustre, and nested in a
              sheesham rosewood case finished with solid brass. The result is
              an object intended to be played, inherited, and played again.
            </p>

            <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {[
                ["Board", '18" / 46 cm \u00b7 Makrana onyx & Carrara cream'],
                ["Pieces", "32 \u00b7 hand-carved, individually numbered"],
                ["Case", "Sheesham rosewood, burgundy silk velvet"],
                ["Hardware", "Solid brass, hand-fitted"],
                ["Weight", "11.4 kg presented"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between py-5"
                >
                  <dt className="eyebrow text-ink/50">{label}</dt>
                  <dd className="max-w-[60%] text-right text-sm text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex items-end justify-between">
              <div>
                <p className="eyebrow text-ink/50">From</p>
                <p className="mt-2 font-display text-4xl">£3,450</p>
              </div>
              <button className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-xs font-medium uppercase tracking-luxe text-ivory transition hover:bg-burgundy">
                Enquire
                <span className="transition group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </button>
            </div>
            <p className="mt-6 text-xs text-ink/50">
              Each set is made to order. Current lead time: 11 weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
