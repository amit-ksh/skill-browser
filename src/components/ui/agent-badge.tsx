import { cn } from "@/lib/utils";

export type AgentPlatform =
  | "Claude Code"
  | "Cursor"
  | "Codex"
  | "Copilot"
  | "Windsurf"
  | "Cline"
  | "Gemini"
  | "ChatGPT"
  | "WebMCP v1";

export const AGENT_PLATFORMS: {
  id: string;
  name: string;
  short: string;
  description: string;
}[] = [
  {
    id: "claude",
    name: "Claude Code",
    short: "Claude",
    description: "Anthropic Claude Code terminal agent & desktop tools",
  },
  {
    id: "cursor",
    name: "Cursor",
    short: "Cursor",
    description: "Cursor AI editor .cursorrules & system skills",
  },
  {
    id: "codex",
    name: "Codex",
    short: "Codex",
    description: "OpenAI Codex agent runtime environments",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    short: "Copilot",
    description: "GitHub Copilot Chat & workspace extensions",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    short: "Windsurf",
    description: "Codeium Windsurf IDE cascade workflows",
  },
  {
    id: "cline",
    name: "Cline",
    short: "Cline",
    description: "Autonomous VS Code coding agent",
  },
  {
    id: "gemini",
    name: "Gemini",
    short: "Gemini",
    description: "Google Gemini Code Assist and agent sidecars",
  },
  {
    id: "webmcp",
    name: "WebMCP",
    short: "WebMCP",
    description: "In-browser native agents via navigator.modelContext",
  },
];

export function AgentIcon({
  agent,
  className,
}: {
  agent: string;
  className?: string;
}) {
  const normalized = agent.toLowerCase();

  // Clean geometric SVG representations matching developer tool aesthetic
  if (normalized.includes("claude")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Claude Code"
      >
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    );
  }

  if (normalized.includes("cursor")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Cursor"
      >
        <path d="M4 4L20 12L12 14L8 20L4 4Z" />
      </svg>
    );
  }

  if (
    normalized.includes("codex") ||
    normalized.includes("openai") ||
    normalized.includes("chatgpt")
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Codex"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("copilot")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="GitHub Copilot"
      >
        <path d="M12 3C7 3 4 6 4 10V14C4 16.5 6 18.5 8.5 19H9V16H7V10C7 7.5 9 5.5 12 5.5C15 5.5 17 7.5 17 10V16H15V19H15.5C18 18.5 20 16.5 20 14V10C20 6 17 3 12 3Z" />
      </svg>
    );
  }

  if (normalized.includes("windsurf")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Windsurf"
      >
        <path
          d="M3 17C7 17 9 7 13 7C17 7 19 17 21 17"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (normalized.includes("gemini")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Gemini"
      >
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
      </svg>
    );
  }

  if (normalized.includes("cline")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("w-3.5 h-3.5 fill-current", className)}
        aria-label="Cline"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M9 12L15 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Default WebMCP icon
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("w-3.5 h-3.5 fill-current", className)}
      aria-label="WebMCP"
    >
      <polygon
        points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AgentBadge({
  agent,
  showIcon = true,
  className,
}: {
  agent: string;
  showIcon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--text-muted)] rounded-[var(--radius-xs)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors select-none",
        className,
      )}
      title={`Compatible with ${agent}`}
    >
      {showIcon && (
        <AgentIcon agent={agent} className="w-2.5 h-2.5 opacity-80" />
      )}
      <span>{agent}</span>
    </span>
  );
}
