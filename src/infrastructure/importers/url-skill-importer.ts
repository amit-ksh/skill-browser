import {
  AppError,
  type CategoryId,
  type Skill,
  SkillSchema,
} from "@/contracts";
import { sanitizeMarkdown } from "@/lib/markdown-sanitizer";

const MAX_PAYLOAD_BYTES = 512 * 1024; // 512KB

export class UrlSkillImporter {
  validateUrl(urlString: string): { valid: boolean; error?: string } {
    try {
      const parsed = new URL(urlString);
      if (parsed.protocol !== "https:") {
        return {
          valid: false,
          error: "Only secure HTTPS URLs are permitted for skill imports.",
        };
      }

      const host = parsed.hostname.toLowerCase();
      if (
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "0.0.0.0" ||
        host.startsWith("192.168.") ||
        host.startsWith("10.") ||
        host.startsWith("172.16.") ||
        host.endsWith(".local") ||
        host.endsWith(".internal")
      ) {
        return {
          valid: false,
          error: "Internal and private network addresses are restricted.",
        };
      }

      return { valid: true };
    } catch {
      return { valid: false, error: "Invalid URL format." };
    }
  }

  parseRawContent(
    rawText: string,
    sourceUrl?: string,
  ): { skill: Skill; warnings: string[] } {
    const warnings: string[] = [];

    if (!rawText.trim()) {
      throw new AppError("INVALID_SKILL", "Provided content is empty.");
    }

    if (rawText.length > MAX_PAYLOAD_BYTES) {
      throw new AppError(
        "INVALID_SKILL",
        "Skill content exceeds maximum 512KB size limit.",
      );
    }

    // 1. Try JSON parsing
    try {
      const json = JSON.parse(rawText);
      const parsed = SkillSchema.safeParse({
        ...json,
        sourceType: "imported",
        sourceUrl: sourceUrl || json.sourceUrl || null,
        verificationStatus: "custom",
        instructions: sanitizeMarkdown(json.instructions || ""),
      });

      if (parsed.success) {
        return { skill: parsed.data, warnings };
      }
    } catch {
      // Not JSON, fall back to Markdown parsing
    }

    // 2. Parse Markdown with Frontmatter / Heading Extraction
    const sanitized = sanitizeMarkdown(rawText);
    const lines = sanitized.split("\n");

    let title = "";
    let description = "";
    let category: CategoryId = "other";
    let tags: string[] = ["imported", "community"];
    let author = "External Import";
    let version = "1.0.0";

    // Check YAML frontmatter --- ... ---
    let instructionLines = lines;
    if (lines[0]?.trim() === "---") {
      const endIdx = lines.slice(1).findIndex((l) => l.trim() === "---");
      if (endIdx !== -1) {
        const frontmatterLines = lines.slice(1, endIdx + 1);
        instructionLines = lines.slice(endIdx + 2);

        for (const line of frontmatterLines) {
          const colonIdx = line.indexOf(":");
          if (colonIdx > 0) {
            const key = line.slice(0, colonIdx).trim().toLowerCase();
            const val = line
              .slice(colonIdx + 1)
              .trim()
              .replace(/^["']|["']$/g, "");

            if (key === "name" || key === "title") title = val;
            else if (key === "description" || key === "desc") description = val;
            else if (key === "author") author = val;
            else if (key === "version") version = val;
            else if (key === "category") {
              const catLower = val.toLowerCase().replace(/\s+/g, "-");
              if (
                [
                  "software-development",
                  "design",
                  "marketing",
                  "research",
                  "productivity",
                  "writing",
                  "other",
                ].includes(catLower)
              ) {
                category = catLower as CategoryId;
              }
            } else if (key === "tags") {
              tags = val
                .split(",")
                .map((t) => t.trim().toLowerCase())
                .filter(Boolean);
            }
          }
        }
      }
    }

    // Extract title from first # heading if missing
    if (!title) {
      const headingLine = instructionLines.find((l) =>
        l.trim().startsWith("# "),
      );
      if (headingLine) {
        title = headingLine.trim().replace(/^#\s+/, "");
      } else {
        title = "Imported AI Skill";
        warnings.push("No title found; defaulted to 'Imported AI Skill'.");
      }
    }

    // Extract description from first paragraph if missing
    if (!description) {
      const paragraph = instructionLines.find(
        (l) =>
          l.trim().length > 0 &&
          !l.trim().startsWith("#") &&
          !l.trim().startsWith("---"),
      );
      if (paragraph) {
        description = paragraph.trim().slice(0, 300);
      } else {
        description =
          "Imported custom instructions for browser-based AI agents.";
        warnings.push("No explicit description provided.");
      }
    }

    const id =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40) || `imported-skill-${Date.now()}`;

    // Simple deterministic hash
    let hashNum = 0;
    for (let i = 0; i < sanitized.length; i++) {
      hashNum = (hashNum << 5) - hashNum + sanitized.charCodeAt(i);
      hashNum |= 0;
    }
    const integrityHash = `sha256-import-${Math.abs(hashNum).toString(16)}`;

    const finalSkill: Skill = {
      id,
      name: title,
      description,
      version: version || "1.0.0",
      category,
      tags: tags.length > 0 ? tags : ["imported"],
      author,
      sourceType: "imported",
      sourceUrl: sourceUrl || null,
      verificationStatus: "custom",
      updatedAt: new Date().toISOString(),
      instructions: instructionLines.join("\n").trim() || sanitized,
      references: [],
      compatibility: ["WebMCP v1", "Claude Code", "Cursor", "ChatGPT"],
      license: "Custom",
      integrityHash,
    };

    return { skill: finalSkill, warnings };
  }

  async fetchFromUrl(
    urlString: string,
  ): Promise<{ skill: Skill; warnings: string[] }> {
    const urlCheck = this.validateUrl(urlString);
    if (!urlCheck.valid) {
      throw new AppError("INVALID_INPUT", urlCheck.error || "Invalid URL.");
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(urlString, {
        signal: controller.signal,
        headers: {
          Accept: "application/json, text/markdown, text/plain, */*",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new AppError(
          "SOURCE_UNAVAILABLE",
          `Source returned HTTP error status ${res.status}: ${res.statusText}`,
        );
      }

      const rawText = await res.text();
      return this.parseRawContent(rawText, urlString);
    } catch (err: unknown) {
      if (err instanceof AppError) throw err;
      if (
        err &&
        typeof err === "object" &&
        "name" in err &&
        err.name === "AbortError"
      ) {
        throw new AppError(
          "SOURCE_UNAVAILABLE",
          "Request timed out fetching skill from remote URL.",
        );
      }
      throw new AppError(
        "IMPORT_FAILED",
        err instanceof Error
          ? err.message
          : "Failed to fetch skill content from URL.",
      );
    }
  }
}

export const urlSkillImporter = new UrlSkillImporter();
