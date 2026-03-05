import { cn } from "@/lib/utils";

interface ZhartaLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ZhartaLogo({
  className,
  showText = true,
  size = "md",
}: ZhartaLogoProps) {
  const dimensions = {
    sm: { diamond: 24, fontSize: 12, gap: 6 },
    md: { diamond: 32, fontSize: 14, gap: 8 },
    lg: { diamond: 40, fontSize: 18, gap: 10 },
  };

  const d = dimensions[size];

  return (
    <div className={cn("flex items-center", className)} style={{ gap: d.gap }}>
      <svg
        width={d.diamond}
        height={d.diamond}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond / losange shape */}
        <path
          d="M20 2L38 20L20 38L2 20L20 2Z"
          fill="#00D4AA"
          fillOpacity="0.15"
          stroke="#00D4AA"
          strokeWidth="2"
        />
        {/* Letter Z inside the diamond */}
        <path
          d="M13 14H27L13 26H27"
          stroke="#00D4AA"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      {showText && (
        <span
          className="font-semibold tracking-[0.15em] text-[var(--foreground)]"
          style={{ fontSize: d.fontSize }}
        >
          ZHARTA
        </span>
      )}
    </div>
  );
}
