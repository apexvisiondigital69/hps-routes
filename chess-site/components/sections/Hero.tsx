export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-8xl grid-cols-1 gap-12 px-6 pt-20 pb-24 md:grid-cols-12 md:gap-16 md:px-10 md:pt-28 md:pb-32">
        {/* Copy */}
        <div className="md:col-span-5 md:pt-10">
          <p className="eyebrow text-ink/60">Nº 01 &middot; The Heritage Set</p>
          <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight md:text-[5.5rem]">
            The art
            <br />
            of the
            <br />
            <em className="not-italic text-burgundy">long game.</em>
          </h1>
          <p className="mt-10 max-w-md text-base leading-relaxed text-ink/70">
            Hand-carved in onyx and cream marble. Presented in sheesham
            rosewood, lined in burgundy silk velvet, and finished by a single
            craftsman over the course of eleven weeks.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <a
              href="#set"
              className="group inline-flex items-center gap-4 border-b border-ink pb-1 text-sm tracking-wide"
            >
              Discover the set
              <span className="transition group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#craft"
              className="eyebrow text-ink/60 transition hover:text-ink"
            >
              Watch the film
            </a>
          </div>
        </div>

        {/* Hero image area */}
        <div className="md:col-span-7">
          <HeroArtwork />
        </div>
      </div>

      {/* Marquee / pillars */}
      <div className="border-y border-ink/10 bg-bone">
        <div className="mx-auto grid max-w-8xl grid-cols-2 divide-x divide-ink/10 md:grid-cols-4">
          {[
            ["11 weeks", "Per set, by a single hand"],
            ["1968", "Atelier founded, Sialkot"],
            ["Nº 32 / 100", "Current edition"],
            ["Lifetime", "Restoration included"],
          ].map(([top, bottom]) => (
            <div key={top} className="px-6 py-8 md:px-10 md:py-10">
              <p className="font-display text-3xl">{top}</p>
              <p className="mt-2 text-xs tracking-wide text-ink/60">{bottom}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroArtwork() {
  // SVG-based editorial illustration of the presentation box + board.
  // Intentionally understated and photographic in palette so it reads as
  // "placeholder product photography" until a real image is dropped in.
  return (
    <div className="relative aspect-[5/6] w-full overflow-hidden bg-gradient-to-br from-[#2b211c] via-[#1a1613] to-[#0c0907] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
      {/* soft light */}
      <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#f6f1e7]/10 blur-3xl" />
      {/* Box */}
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[78%] -translate-x-1/2 -translate-y-1/2">
        {/* lid */}
        <div className="absolute -top-[28%] left-0 right-0 h-[40%] origin-bottom -rotate-[10deg] rounded-sm bg-[#4a2a1a] shadow-2xl">
          <div className="absolute inset-1 rounded-sm bg-gradient-to-b from-[#5a3421] to-[#3a2014]" />
          {/* brass corners */}
          <span className="absolute left-1 top-1 h-3 w-3 bg-brass" />
          <span className="absolute right-1 top-1 h-3 w-3 bg-brass" />
          <span className="absolute left-1 bottom-1 h-2 w-2 bg-brass" />
          <span className="absolute right-1 bottom-1 h-2 w-2 bg-brass" />
        </div>
        {/* base box */}
        <div className="absolute inset-0 rounded-sm bg-[#3a2014] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-1 rounded-sm bg-gradient-to-b from-[#4a2a1a] to-[#2a1509]" />
          {/* velvet interior */}
          <div className="absolute inset-3 bg-burgundy/90">
            {/* board */}
            <div className="marble-board absolute inset-2" />
          </div>
          {/* brass corners */}
          <span className="absolute left-1 top-1 h-3 w-3 bg-brass" />
          <span className="absolute right-1 top-1 h-3 w-3 bg-brass" />
          <span className="absolute left-1 bottom-1 h-3 w-3 bg-brass" />
          <span className="absolute right-1 bottom-1 h-3 w-3 bg-brass" />
        </div>
      </div>

      {/* editorial caption */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory/80">
        <p className="eyebrow">Plate 01</p>
        <p className="eyebrow">The Heritage Set &mdash; £3,450</p>
      </div>
    </div>
  );
}
