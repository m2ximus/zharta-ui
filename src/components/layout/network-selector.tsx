"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Network {
  id: string;
  name: string;
  iconUrl: string | null;
  color: string;
  connected?: boolean;
}

const networks: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    iconUrl: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/eth.svg",
    color: "#627EEA",
  },
  {
    id: "base",
    name: "Base",
    iconUrl: "https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg",
    color: "#0052FF",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    iconUrl: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/arb.svg",
    color: "#28A0F0",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    iconUrl: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/avax.svg",
    color: "#E84142",
  },
  {
    id: "optimism",
    name: "Optimism",
    iconUrl: "https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/Profile-Logo.svg",
    color: "#FF0420",
  },
  {
    id: "sandbox",
    name: "Sandbox",
    iconUrl: null,
    color: "var(--color-primary)",
    connected: true,
  },
];

function NetworkIcon({ network, size }: { network: Network; size: number }) {
  const [error, setError] = React.useState(false);

  if (!network.iconUrl || error) {
    return (
      <span
        className="flex items-center justify-center rounded-full text-white font-bold"
        style={{
          width: size,
          height: size,
          backgroundColor: network.color,
          fontSize: size * 0.45,
        }}
      >
        {network.name[0]}
      </span>
    );
  }

  return (
    <Image
      src={network.iconUrl}
      alt={network.name}
      width={size}
      height={size}
      className="flex-shrink-0"
      onError={() => setError(true)}
    />
  );
}

export function NetworkSelector() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("ethereum");

  const current = networks.find((n) => n.id === selected) ?? networks[0];

  return (
    <>
      {/* Trigger button — shows current network icon */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
        title={current.name}
      >
        <NetworkIcon network={current} size={18} />
        <span className="text-xs text-[var(--foreground-muted)] hidden sm:inline">
          {current.name}
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={() => setOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-2xl p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  Select network
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors text-[var(--foreground-muted)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Network grid */}
              <div className="grid grid-cols-3 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      setSelected(network.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2.5 p-6 rounded-[var(--radius-card)] border-2 transition-all cursor-pointer hover:bg-[var(--muted)]/30",
                      selected === network.id
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--foreground-muted)]/30"
                    )}
                  >
                    <NetworkIcon network={network} size={36} />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {network.name}
                    </span>
                    {network.connected && (
                      <span className="text-[10px] text-[var(--color-primary)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                        Connected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
