export function BlueprintHouse({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 480"
      fill="none"
      className={className}
      role="img"
      aria-label="Чертёж фасада дома с указанием размеров"
    >
      <g stroke="var(--color-blue)" strokeWidth="1.4" opacity="0.55">
        <line x1="0" y1="60" x2="560" y2="60" strokeDasharray="1 5" />
        <line x1="0" y1="120" x2="560" y2="120" strokeDasharray="1 5" />
      </g>

      {/* ground line */}
      <line x1="30" y1="400" x2="530" y2="400" stroke="var(--color-blue)" strokeWidth="1.5" />

      {/* house body */}
      <rect x="120" y="200" width="260" height="200" stroke="var(--color-blue)" strokeWidth="1.8" />
      {/* roof */}
      <path d="M100 200 L250 90 L400 200" stroke="var(--color-blue)" strokeWidth="1.8" strokeLinejoin="round" />
      {/* chimney */}
      <rect x="320" y="110" width="18" height="55" stroke="var(--color-blue)" strokeWidth="1.4" />

      {/* door */}
      <rect x="225" y="310" width="50" height="90" stroke="var(--color-blue)" strokeWidth="1.4" />
      <circle cx="264" cy="358" r="1.6" fill="var(--color-blue)" />

      {/* windows */}
      <rect x="150" y="240" width="45" height="45" stroke="var(--color-blue)" strokeWidth="1.2" />
      <line x1="172.5" y1="240" x2="172.5" y2="285" stroke="var(--color-blue)" strokeWidth="1" />
      <line x1="150" y1="262.5" x2="195" y2="262.5" stroke="var(--color-blue)" strokeWidth="1" />

      <rect x="305" y="240" width="45" height="45" stroke="var(--color-blue)" strokeWidth="1.2" />
      <line x1="327.5" y1="240" x2="327.5" y2="285" stroke="var(--color-blue)" strokeWidth="1" />
      <line x1="305" y1="262.5" x2="350" y2="262.5" stroke="var(--color-blue)" strokeWidth="1" />

      {/* dimension: width */}
      <g stroke="var(--color-blue)" strokeWidth="1">
        <line x1="120" y1="430" x2="380" y2="430" />
        <line x1="120" y1="424" x2="120" y2="436" />
        <line x1="380" y1="424" x2="380" y2="436" />
      </g>
      <text
        x="250"
        y="452"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-blue)"
        letterSpacing="0.5"
      >
        12,40 м
      </text>

      {/* dimension: height */}
      <g stroke="var(--color-blue)" strokeWidth="1">
        <line x1="440" y1="90" x2="440" y2="400" />
        <line x1="434" y1="90" x2="446" y2="90" />
        <line x1="434" y1="400" x2="446" y2="400" />
      </g>
      <text
        x="452"
        y="248"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-blue)"
        letterSpacing="0.5"
        transform="rotate(90 452 248)"
      >
        8,10 м
      </text>

      {/* annotation label */}
      <text x="35" y="180" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-blue)" letterSpacing="0.5">
        УЧАСТОК 12 СОТОК
      </text>
      <line x1="35" y1="186" x2="115" y2="205" stroke="var(--color-blue)" strokeWidth="0.8" strokeDasharray="2 3" />

      {/* corner registration marks */}
      <g stroke="var(--color-blue)" strokeWidth="1.2">
        <path d="M8 8 L8 26 M8 8 L26 8" />
        <path d="M552 8 L552 26 M552 8 L534 8" />
        <path d="M8 472 L8 454 M8 472 L26 472" />
        <path d="M552 472 L552 454 M552 472 L534 472" />
      </g>
    </svg>
  );
}
