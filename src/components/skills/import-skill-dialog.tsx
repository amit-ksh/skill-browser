"use client";

import { FileCode, FileUp, Globe, Plus, ShieldAlert } from "lucide-react";
import { useRef, useState } from "react";
import { MarkdownViewer } from "@/components/skills/markdown-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import type { Skill } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";
import {
  previewSkillFromRawText,
  previewSkillFromUrl,
} from "@/domain/services/import-skill";

type ImportSource = "url" | "paste" | "file";

export function ImportSkillDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<ImportSource>("paste");
  const [url, setUrl] = useState("");
  const [rawText, setRawText] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<{
    skill: Skill;
    warnings: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { installSkill } = useSkillspace();
  const { success, error, info } = useToast();

  const reset = () => {
    setUrl("");
    setRawText("");
    setFileName("");
    setPreview(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const close = () => {
    reset();
    onClose();
  };

  const handlePreview = async () => {
    setIsLoading(true);
    try {
      const result =
        activeTab === "url"
          ? await previewSkillFromUrl(url.trim())
          : previewSkillFromRawText(rawText);
      setPreview(result);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not preview this skill.";
      error(
        activeTab === "url" && /fetch|network|cors/i.test(message)
          ? "This source blocks browser imports. Use its raw file URL or paste/upload the skill file."
          : message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 512 * 1024) {
      error("Skill files must be 512KB or smaller.");
      return;
    }
    try {
      setRawText(await file.text());
      setFileName(file.name);
      setPreview(null);
      info(`${file.name} is ready to preview.`);
    } catch {
      error("We couldn't read that file. Try a UTF-8 Markdown or JSON file.");
    }
  };

  const handleAdd = async () => {
    if (!preview) return;
    setIsLoading(true);
    try {
      const added = await installSkill(preview.skill);
      if (added) {
        success(`Added “${preview.skill.name}” to your Skillspace.`);
      } else {
        info(`“${preview.skill.name}” is already in your Skillspace.`);
      }
      close();
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : "Could not add this skill.");
    } finally {
      setIsLoading(false);
    }
  };

  const sourceIsReady =
    activeTab === "url" ? url.trim().length > 0 : rawText.trim().length > 0;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      title={
        <div className="flex items-center gap-2">
          <Plus className="size-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text)]">
            Add a skill
          </span>
        </div>
      }
      description="Preview a Markdown or JSON skill before adding it to your local Skillspace. Nothing is sent to a server."
      maxWidth="lg"
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={close}
            disabled={isLoading}
          >
            Cancel
          </Button>
          {preview ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAdd}
              isLoading={isLoading}
              className="gap-1.5"
            >
              <Plus className="size-3.5" />
              Add to Skillspace
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handlePreview}
              disabled={!sourceIsReady}
              isLoading={isLoading}
            >
              Preview skill
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-5">
        <Tabs
          defaultValue="paste"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as ImportSource);
            setPreview(null);
          }}
        >
          <TabsList className="grid w-full grid-cols-3 bg-[var(--surface-muted)]">
            <TabsTrigger value="paste" className="gap-1.5 text-xs">
              <FileCode className="size-3.5" /> Paste
            </TabsTrigger>
            <TabsTrigger value="file" className="gap-1.5 text-xs">
              <FileUp className="size-3.5" /> File
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-1.5 text-xs">
              <Globe className="size-3.5" /> URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-2 pt-4">
            <label
              htmlFor="import-paste"
              className="text-xs font-medium text-[var(--text-muted)]"
            >
              Skill Markdown or JSON
            </label>
            <textarea
              id="import-paste"
              rows={10}
              placeholder={
                "---\nname: My writing workflow\ndescription: A focused workflow for crisp product writing.\n---\n\n# Instructions\n..."
              }
              value={rawText}
              onChange={(event) => {
                setRawText(event.target.value);
                setPreview(null);
              }}
              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] p-3 font-mono text-xs text-[var(--text)] outline-none placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)]"
            />
          </TabsContent>

          <TabsContent value="file" className="space-y-3 pt-4">
            <input
              ref={fileInputRef}
              id="import-file"
              type="file"
              accept=".md,.mdx,.markdown,.txt,.json,application/json,text/markdown,text/plain"
              className="sr-only"
              onChange={(event) => void handleFile(event.target.files?.[0])}
            />
            <label
              htmlFor="import-file"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)] px-4 py-8 text-center transition-colors hover:border-[var(--accent)]"
            >
              <FileUp className="size-5 text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--text)]">
                Choose a skill file
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Markdown, text, or JSON · up to 512KB
              </span>
            </label>
            {fileName && (
              <p className="text-xs text-[var(--text-muted)]">
                Ready: {fileName}
              </p>
            )}
          </TabsContent>

          <TabsContent value="url" className="space-y-2 pt-4">
            <label
              htmlFor="import-url"
              className="text-xs font-medium text-[var(--text-muted)]"
            >
              Public HTTPS raw-file URL
            </label>
            <Input
              id="import-url"
              placeholder="https://raw.githubusercontent.com/.../SKILL.md"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setPreview(null);
              }}
              className="font-mono text-xs"
            />
            <p className="text-xs leading-relaxed text-[var(--text-subtle)]">
              Some sites block browser reads. When that happens, open the raw
              file and paste or upload it instead.
            </p>
          </TabsContent>
        </Tabs>

        {preview && (
          <section
            className="space-y-3 border-t border-[var(--border)] pt-5"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-subtle)]">
                  Ready to add
                </p>
                <h3 className="mt-1 text-base font-semibold text-[var(--text)]">
                  {preview.skill.name}
                </h3>
              </div>
              <Badge variant="accent" size="sm">
                {preview.skill.category.replace("-", " ")}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {preview.skill.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {preview.skill.tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-[var(--text-muted)]">
                Sanitized instructions
              </p>
              <div className="max-h-48 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] p-3">
                <MarkdownViewer content={preview.skill.instructions} />
              </div>
            </div>
            {preview.warnings.length > 0 && (
              <div className="flex gap-2 rounded-[var(--radius-md)] border border-[var(--warning)]/40 bg-[var(--surface-muted)] p-3 text-xs text-[var(--text-muted)]">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[var(--warning)]" />
                <div>
                  {preview.warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </Dialog>
  );
}
