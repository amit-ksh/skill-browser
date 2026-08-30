/**
 * Safe markdown sanitizer and parser.
 * Enforces zero arbitrary code execution, strips scripts, iframes, inline event handlers,
 * and neutralizes dangerous HTML/URIs.
 */

export function sanitizeMarkdown(rawText: string): string {
  if (!rawText) return "";

  // 1. Remove dangerous executable and frame tags
  let clean = rawText
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "")
    .replace(/<base\b[^>]*>/gi, "")
    .replace(/<meta\b[^>]*>/gi, "");

  // 2. Remove inline event handlers (e.g. onclick=, onerror=, onload=)
  clean = clean.replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, "");

  // 3. Remove dangerous protocols (javascript:, data:text/html, vbscript:)
  clean = clean.replace(
    /href\s*=\s*["']\s*(?:javascript|data|vbscript):[^"']*["']/gi,
    'href="#"',
  );

  return clean;
}

export type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "blockquote"; text: string };

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const sanitized = sanitizeMarkdown(markdown);
  const lines = sanitized.split("\n");
  const blocks: MarkdownBlock[] = [];

  let inCodeBlock = false;
  let codeLang = "";
  let codeBuffer: string[] = [];

  let currentList: { items: string[]; ordered: boolean } | null = null;

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push({
        type: "list",
        items: currentList.items,
        ordered: currentList.ordered,
      });
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks ```lang
    if (line.trim().startsWith("```")) {
      flushList();
      if (inCodeBlock) {
        blocks.push({
          type: "code",
          language: codeLang || "text",
          code: codeBuffer.join("\n"),
        });
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = "";
      } else {
        inCodeBlock = true;
        codeLang = line.trim().replace(/^```/, "").trim();
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings #, ##, ###
    if (trimmed.startsWith("#")) {
      flushList();
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        blocks.push({
          type: "heading",
          level: match[1].length,
          text: match[2],
        });
        continue;
      }
    }

    // Blockquote >
    if (trimmed.startsWith(">")) {
      flushList();
      blocks.push({
        type: "blockquote",
        text: trimmed.replace(/^>\s*/, ""),
      });
      continue;
    }

    // Lists (unordered - or *, ordered 1.)
    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);

    if (unorderedMatch) {
      if (!currentList || currentList.ordered) {
        flushList();
        currentList = { items: [], ordered: false };
      }
      currentList.items.push(unorderedMatch[1]);
      continue;
    }

    if (orderedMatch) {
      if (!currentList || !currentList.ordered) {
        flushList();
        currentList = { items: [], ordered: true };
      }
      currentList.items.push(orderedMatch[1]);
      continue;
    }

    // Paragraph
    flushList();
    blocks.push({
      type: "paragraph",
      text: trimmed,
    });
  }

  flushList();

  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push({
      type: "code",
      language: codeLang || "text",
      code: codeBuffer.join("\n"),
    });
  }

  return blocks;
}
