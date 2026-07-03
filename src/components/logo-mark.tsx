export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      role="img"
      aria-label="Квартал"
    >
      <rect x="1.5" y="1.5" width="21" height="21" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1.5" y="1.5" width="10.5" height="10.5" fill="currentColor" />
      <line x1="1.5" y1="12" x2="22.5" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="1.5" x2="12" y2="22.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
