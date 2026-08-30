"use client";

import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { parseMarkdownBlocks } from "@/lib/markdown-sanitizer";
import { cn } from "@/lib/utils";

export function MarkdownViewer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div
      className={cn(
        "space-y-4 text-sm leading-relaxed text-[var(--text)] font-sans",
        className,
      )}
    >
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "heading") {
          if (block.level === 1) {
            return (
              <h1
                key={key}
                className="text-xl font-bold text-[var(--text)] tracking-tight pt-2 pb-1 border-b border-[var(--border)]"
              >
                {block.text}
              </h1>
            );
          }
          if (block.level === 2) {
            return (
              <h2
                key={key}
                className="text-base font-semibold text-[var(--text)] tracking-tight pt-3 pb-0.5"
              >
                {block.text}
              </h2>
            );
          }
          return (
            <h3
              key={key}
              className="text-sm font-semibold text-[var(--text)] tracking-tight pt-2"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={key}
              className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed"
            >
              {renderInlineTokens(block.text)}
            </p>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={key}
              className="pl-3.5 py-1.5 border-l-2 border-[var(--accent)] bg-[var(--surface-muted)] rounded-r-[var(--radius-sm)] text-xs text-[var(--text-muted)] italic"
            >
              {renderInlineTokens(block.text)}
            </blockquote>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={key}
              className={cn(
                "space-y-1 text-xs sm:text-sm text-[var(--text-muted)]",
                block.ordered ? "list-decimal pl-5" : "list-disc pl-5",
              )}
            >
              {block.items.map((item) => (
                <li key={`item-${item.replace(/\s+/g, "-").slice(0, 30)}`}>
                  {renderInlineTokens(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <CodeSnippet
              key={key}
              code={block.code}
              language={block.language}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

function CodeSnippet({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative my-3 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--background)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--surface)] border-b border-[var(--border)] text-[11px] font-mono text-[var(--text-subtle)]">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1 rounded-sm cursor-pointer"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[var(--success)]" />
              <span className="text-[var(--success)]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 text-xs font-mono text-[var(--text)] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInlineTokens(text: string): React.ReactNode {
  // Simple token parser for `code`, **bold**, *italic*, and [links](url)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // 1. Inline code: `code`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // 2. Bold: **bold**
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // 3. Link: [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find closest match
    let closestIndex = -1;
    let matchType: "code" | "bold" | "link" | null = null;
    let currentMatch: RegExpMatchArray | null = null;

    if (
      codeMatch &&
      codeMatch.index !== undefined &&
      (closestIndex === -1 || codeMatch.index < closestIndex)
    ) {
      closestIndex = codeMatch.index;
      matchType = "code";
      currentMatch = codeMatch;
    }
    if (
      boldMatch &&
      boldMatch.index !== undefined &&
      (closestIndex === -1 || boldMatch.index < closestIndex)
    ) {
      closestIndex = boldMatch.index;
      matchType = "bold";
      currentMatch = boldMatch;
    }
    if (
      linkMatch &&
      linkMatch.index !== undefined &&
      (closestIndex === -1 || linkMatch.index < closestIndex)
    ) {
      closestIndex = linkMatch.index;
      matchType = "link";
      currentMatch = linkMatch;
    }

    if (matchType && currentMatch && closestIndex !== -1) {
      if (closestIndex > 0) {
        parts.push(remaining.substring(0, closestIndex));
      }

      if (matchType === "code") {
        parts.push(
          <code
            key={`inline-${keyIndex++}`}
            className="px-1.5 py-0.5 mx-0.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] text-[var(--accent)] font-mono text-[11px] border border-[var(--border)]"
          >
            {currentMatch[1]}
          </code>,
        );
      } else if (matchType === "bold") {
        parts.push(
          <strong
            key={`inline-${keyIndex++}`}
            className="font-semibold text-[var(--text)]"
          >
            {currentMatch[1]}
          </strong>,
        );
      } else if (matchType === "link") {
        const safeHref = currentMatch[2].startsWith("http")
          ? currentMatch[2]
          : "#";
        parts.push(
          <a
            key={`inline-${keyIndex++}`}
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline underline-offset-2"
          >
            {currentMatch[1]}
          </a>,
        );
      }

      remaining = remaining.substring(closestIndex + currentMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}
