interface ScreenPlaceholderProps {
  label?: string;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}

export function ScreenPlaceholder({
  label = "Add screen / demo here",
  aspectRatio = "16/9",
  className = "",
  style = {},
  dark = true,
}: ScreenPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio,
        background: dark ? "rgba(255,255,255,0.03)" : "rgba(13,13,11,0.04)",
        border: "1px dashed rgba(201,185,122,0.25)",
        borderRadius: "2px",
        ...style,
      }}
    >
      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,185,122,1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(201,185,122,1)" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(201,185,122,1)" strokeWidth="0.5" />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,185,122,0.5)" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="14" rx="1" />
          <path d="M8 21h8M12 17v4" />
        </svg>
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "rgba(201,185,122,0.45)",
            textAlign: "center",
          }}
        >
          {label.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
