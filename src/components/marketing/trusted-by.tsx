import Image from "next/image";

const partners = [
  { name: "Securitize", logo: "/logos/securitize.svg" },
  { name: "Keyrock", logo: "/logos/keyrock.svg" },
  { name: "Re7 Capital", logo: "/logos/re7.svg" },
  { name: "Circle", logo: "/logos/circle-full.svg" },
  { name: "Chainlink", logo: "/logos/chainlink.svg" },
  { name: "Alchemy", logo: "/logos/alchemy.svg" },
  { name: "Avalanche", logo: "/logos/avalanche.svg" },
  { name: "RedStone", logo: "/logos/redstone.svg" },
  { name: "Lagoon", logo: "/logos/lagoon.svg" },
  { name: "Drip", logo: "/logos/drip.svg" },
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
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
