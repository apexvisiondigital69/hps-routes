const MATERIALS = [
  {
    name: "Makrana Onyx",
    origin: "Rajasthan, India",
    note: "Quarried from the same marble used for the Taj Mahal. Cut in blocks, polished by hand over eight hours per piece.",
    swatch: "bg-[#0f0c0a]",
  },
  {
    name: "Carrara Cream",
    origin: "Tuscany, Italy",
    note: "Selected for its warm, silken vein. Every square is matched to its neighbour before cutting.",
    swatch: "bg-[#efe7d7]",
  },
  {
    name: "Sheesham Rosewood",
    origin: "Punjab, Pakistan",
    note: "Aged twelve years before joinery. Finished with beeswax. No stains, no lacquers.",
    swatch: "bg-[#3a2014]",
  },
  {
    name: "Silk Velvet",
    origin: "Como, Italy",
    note: "Hand-dyed in burgundy with natural madder root. Cradles each piece without a whisper.",
    swatch: "bg-burgundy",
  },
];

export function Materials() {
  return (
    <section id="materials" className="bg-bone py-28 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-ink/60">Materials</p>
          <h2 className="mt-6 font-display text-5xl leading-tight md:text-6xl">
            Four materials.
            <br />
            Four continents.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-ink/70">
            We do not source by catalogue. Each material is chosen at the
            quarry, the mill, or the loom &mdash; and carried home by hand.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {MATERIALS.map((m, i) => (
            <div key={m.name} className="group relative flex gap-8">
              <div
                className={`${m.swatch} h-40 w-40 flex-shrink-0 ring-1 ring-ink/10 transition group-hover:scale-[1.02]`}
              />
              <div className="pt-2">
                <p className="eyebrow text-ink/40">
                  Nº 0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs tracking-wide text-ink/50">
                  {m.origin}
                </p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/75">
                  {m.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
