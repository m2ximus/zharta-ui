"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[var(--color-dark-bg)]">
      {/* Radial teal glow behind Lottie */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div
          className="w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Lottie background — blur/glow layer (white/teal, looping) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div
          className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px]"
          style={{
            filter: "blur(40px) brightness(3) hue-rotate(140deg) saturate(0.3)",
            opacity: 0.5,
          }}
        >
          <DotLottieReact
            src="https://cdn.prod.website-files.com/6734e8b50be7a2967fc4a262/67542a04e848d98aa319013a_hero-background-logo.json"
            autoplay
            loop
            mode="bounce"
            speed={0.5}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Lottie background — crisp layer (white/teal, bounce) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div
          className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]"
          style={{
            filter: "brightness(3) hue-rotate(140deg) saturate(0.3)",
            opacity: 0.25,
          }}
        >
          <DotLottieReact
            src="https://cdn.prod.website-files.com/6734e8b50be7a2967fc4a262/67542a04e848d98aa319013a_hero-background-logo.json"
            autoplay
            loop
            mode="bounce"
            speed={0.5}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-dark-text)] leading-[1.05] tracking-tight"
        >
          Where institutional credit meets onchain rails
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-5 text-base md:text-lg text-[var(--color-dark-text-muted)] max-w-xl font-[family-name:var(--font-body)]"
        >
          Fixed-rate lending infrastructure for tokenized assets
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-8 flex items-center gap-0"
        >
          <div className="flex items-center bg-[var(--color-dark-bg-secondary)] border border-[var(--color-dark-border)] rounded-full overflow-hidden max-w-md w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-text-muted)] outline-none font-[family-name:var(--font-body)]"
            />
            <button className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium bg-[var(--color-primary)] text-black rounded-full m-1 hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer whitespace-nowrap">
              Get Whitelisted
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-dark-bg)] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
