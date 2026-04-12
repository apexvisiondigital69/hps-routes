const LINKS = {
  Maison: ["Our Story", "Craftsmanship", "The Atelier", "Sustainability"],
  Services: ["Engraving", "Gift Wrapping", "Restoration", "Private Commission"],
  Care: ["Contact", "Shipping", "Returns", "Care Guide"],
  Legal: ["Terms", "Privacy", "Cookies", "Accessibility"],
};

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-8xl px-6 py-20 md:px-10">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl">Royal Chess Co.</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              A small atelier of carvers, joiners and lapidaries working in
              Sialkot, Pakistan, since 1968.
            </p>
          </div>
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <p className="eyebrow text-ink/50">{heading}</p>
              <ul className="mt-6 space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-ink/80 transition hover:text-ink"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-ink/50">
            &copy; {new Date().getFullYear()} Royal Chess Co. Handcrafted in
            Pakistan.
          </p>
          <p className="eyebrow text-ink/50">Est. 1968 &middot; Sialkot</p>
        </div>
      </div>
    </footer>
  );
}
