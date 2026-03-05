"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface SandboxToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

export function SandboxToggle({
  enabled,
  onToggle,
  className,
}: SandboxToggleProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            onClick={() => onToggle(!enabled)}
            className={cn(
              "relative inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-all duration-200",
              enabled
                ? "bg-[var(--color-primary)] text-black"
                : "border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]",
              className
            )}
          >
            {enabled && (
              <span className="relative flex items-center">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-black/30 animate-ping" />
                  <span className="absolute inset-0 rounded-full bg-black/50" />
                </span>
              </span>
            )}
            Sandbox
          </button>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="bottom"
            sideOffset={8}
            className={cn(
              "z-50 max-w-[220px] rounded-[var(--radius-card)] bg-[var(--card)] border border-[var(--border)] px-3 py-2 text-xs text-[var(--foreground-muted)] shadow-lg",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            Practice with play money to understand loan mechanics.
            <TooltipPrimitive.Arrow className="fill-[var(--card)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
