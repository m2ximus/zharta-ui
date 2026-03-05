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
    sm: { icon: 24, fontSize: 12, gap: 6 },
    md: { icon: 30, fontSize: 14, gap: 8 },
    lg: { icon: 48, fontSize: 18, gap: 10 },
  };

  const d = dimensions[size];

  return (
    <div className={cn("flex items-center", className)} style={{ gap: d.gap }}>
      <svg
        width={d.icon}
        height={d.icon}
        viewBox="52 51 132 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M112.201 180.417V55L56 111.201V124.216L76.2156 144.431V116.451L91.9857 100.671V160.191L112.201 180.417ZM123.969 55V180.417L180.18 124.216V111.201L159.964 90.9857V118.966L144.184 134.746V75.2256L123.969 55Z"
          fill="currentColor"
        />
      </svg>
      {showText && (
        <span
          className="font-semibold tracking-[0.08em] text-[var(--foreground)]"
          style={{ fontSize: d.fontSize }}
        >
          ZHARTA
        </span>
      )}
    </div>
  );
}
