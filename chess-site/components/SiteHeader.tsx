import Link from "next/link";

const NAV = [
  { label: "The Set", href: "#set" },
  { label: "Craftsmanship", href: "#craft" },
  { label: "Materials", href: "#materials" },
  { label: "The Atelier", href: "#atelier" },
  { label: "Journal", href: "#journal" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-xl tracking-tight">
            Royal Chess Co.
          </Link>
          <nav className="hidden gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow text-ink/70 transition hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button className="eyebrow text-ink/70 transition hover:text-ink">
            Search
          </button>
          <button className="eyebrow text-ink/70 transition hover:text-ink">
            Account
          </button>
          <button className="eyebrow text-ink transition hover:opacity-70">
            Cart&nbsp;(0)
          </button>
        </div>
      </div>
    </header>
  );
}
