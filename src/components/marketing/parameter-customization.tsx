"use client";

import { DealParametersConfig } from "@/components/shared/deal-parameters-config";

export function ParameterCustomization() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-dark-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-primary)] font-[family-name:var(--font-body)] mb-4">
            Parameter Customizability
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-[var(--color-dark-text)] mb-6">
            Every parameter. Every deal.{" "}
            <span className="text-[var(--color-primary)]">Your rules.</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--color-dark-text-muted)] max-w-2xl mx-auto">
            Configure every aspect of your lending terms through a single
            interface.
          </p>
        </div>

        {/* Config panel */}
        <div className="max-w-4xl mx-auto">
          <DealParametersConfig interactive={false} />
        </div>
      </div>
    </section>
  );
}
