export function ForgeMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer technical faceted frame */}
      <path
        d="M3 7L7 3H17L21 7V17L17 21H7L3 17V7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[var(--border-strong)]"
      />
      {/* Inner crucible / anvil geometry */}
      <path
        d="M8 8H16L14 13H10L8 8Z"
        fill="currentColor"
        className="text-[var(--accent)]"
      />
      <path
        d="M10 13V17H14V13"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[var(--accent)]"
      />
      {/* Central ember spark */}
      <circle cx="12" cy="10.5" r="1.2" fill="#ffffff" />
    </svg>
  );
}
