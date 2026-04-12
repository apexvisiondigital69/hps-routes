const STEPS = [
  { n: "01", title: "Selection", body: "Blocks of marble are chosen by hand at the quarry, matched for tone and vein." },
  { n: "02", title: "Cutting", body: "Each of 64 squares is cut on a single bench, then lapped for three hours until perfectly flat." },
  { n: "03", title: "Carving", body: "Pieces are shaped with chisels from the 1970s, then sanded through seven grits of silicon carbide." },
  { n: "04", title: "Joinery", body: "The sheesham case is cut, doweled, and pegged \u2014 no nails, no screws, save the brass fittings." },
  { n: "05", title: "Fitting", body: "Interior is lined with silk velvet, cavities carved to the exact profile of each piece." },
  { n: "06", title: "Finishing", body: "The completed set rests for seven days. Then it is inspected, numbered, and signed." },
];

export function Craftsmanship() {
  return (
    <section id="craft" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow text-ink/60">Craftsmanship</p>
            <h2 className="mt-6 font-display text-5xl leading-tight md:text-6xl">
              Eleven weeks.
              <br />
              One pair of hands.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/70">
            Our master carver, Imran, has made each Heritage Set personally
            since 2003. He signs the inside of the case with a graphite pencil,
            beneath the velvet.
          </p>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-16 grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-16">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <p className="font-display text-5xl text-ink/30">{s.n}</p>
              <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
