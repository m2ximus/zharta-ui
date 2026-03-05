import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--color-dark-bg)] overflow-hidden">
      {/* Teal gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0, 212, 170, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-dark-border), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-[var(--color-dark-text)] leading-tight">
          Built for Sophisticated Capital
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[var(--color-dark-text-muted)] max-w-2xl mx-auto font-[family-name:var(--font-body)]">
          Join institutional investors accessing fixed-rate yield on tokenized
          assets
        </p>
        <div className="mt-10">
          <a
            href="mailto:hello@zharta.io"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-[var(--color-primary)] text-black rounded-full hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
