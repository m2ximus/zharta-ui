const partners = [
  "Securitize",
  "Keyrock",
  "Re7 Capital",
  "3Comma",
  "Centrifuge",
  "Maple Finance",
  "Goldfinch",
  "Ondo Finance",
];

export function TrustedBy() {
  return (
    <section className="py-16 bg-[var(--color-dark-bg)] overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
          Trusted By
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-dark-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-dark-bg)] to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14"
            >
              <span className="font-semibold text-xl text-[var(--color-dark-text)] opacity-40 hover:opacity-70 transition-opacity duration-300 whitespace-nowrap font-[family-name:var(--font-body)] select-none">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
