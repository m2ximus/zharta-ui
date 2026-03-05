"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalItems = testimonials.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / totalItems;
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    },
    [totalItems]
  );

  // Auto scroll
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalItems;
        scrollToIndex(next);
        return next;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalItems, scrollToIndex]);

  // Track scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / totalItems;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalItems]);

  return (
    <section className="py-20 md:py-28 bg-[var(--color-dark-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-dark-text-muted)] mb-4 font-[family-name:var(--font-body)]">
            What They Say
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[var(--color-dark-text)]">
            Trusted by leading institutions
          </h2>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[340px] md:w-[420px] snap-start"
            >
              <div className="h-full bg-[var(--color-dark-bg-tertiary)] border border-[var(--color-dark-border)] rounded-[var(--radius-card)] p-6 md:p-8 flex flex-col">
                <Quote className="w-6 h-6 text-[var(--color-primary)] opacity-40 mb-4 flex-shrink-0" />
                <p className="text-[var(--color-dark-text)] text-sm md:text-base leading-relaxed mb-6 flex-1 font-[family-name:var(--font-body)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-dark-border)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center text-sm font-bold text-[var(--color-primary)] font-[family-name:var(--font-mono)]">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-dark-text)] font-[family-name:var(--font-body)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--color-dark-text-muted)] font-[family-name:var(--font-body)]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                scrollToIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? "bg-[var(--color-primary)] w-6"
                  : "bg-[var(--color-dark-border-hover)]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
