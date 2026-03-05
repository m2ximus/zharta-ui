import Image from "next/image";
import { ExternalLink, Shield } from "lucide-react";

const auditors = [
  {
    name: "Hexens",
    subtitle: "Smart Contract Audit",
    url: "#",
  },
  {
    name: "Hacken",
    subtitle: "Smart Contract Audit",
    url: "#",
  },
  {
    name: "Red4Sec",
    subtitle: "Smart Contract Audit",
    url: "#",
  },
];

const infrastructure = [
  { name: "Chainlink", logo: "/logos/chainlink.svg" },
  { name: "Circle", logo: "/logos/circle-full.svg" },
  { name: "Alchemy", logo: "/logos/alchemy.svg" },
  { name: "RedStone", logo: "/logos/redstone.svg" },
];

export function AuditedBy() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-dark-bg)] overflow-hidden">
      {/* Decorative diamond pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diamond-pattern-audit"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 5L55 30L30 55L5 30Z"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond-pattern-audit)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Audited By */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[var(--color-primary)]" />
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
              Security First
            </p>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-dark-text)]">
            Audited By
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {auditors.map((auditor) => (
            <a
              key={auditor.name}
              href={auditor.url}
              className="group relative flex flex-col items-center p-8 bg-[var(--color-dark-bg-secondary)] border border-[var(--color-dark-border)] rounded-[var(--radius-card)] hover:border-[var(--color-dark-border-hover)] transition-all duration-300"
            >
              <span className="text-xl font-semibold text-[var(--color-dark-text)] font-[family-name:var(--font-body)] mb-1">
                {auditor.name}
              </span>
              <span className="text-xs text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
                {auditor.subtitle}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--color-dark-text-muted)] group-hover:text-[var(--color-primary)] transition-colors absolute top-4 right-4" />
            </a>
          ))}
        </div>

        {/* Powered By */}
        <div className="mt-20 text-center">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)] mb-8">
            Powered By
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {infrastructure.map((partner) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={36}
                className="h-7 md:h-9 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300 invert"
              />
            ))}
          </div>
        </div>

        {/* EU Funded badge */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/logos/eu-funded.svg"
            alt="Funded by the European Union"
            width={200}
            height={60}
            className="h-12 w-auto opacity-40 invert"
          />
        </div>
      </div>
    </section>
  );
}
