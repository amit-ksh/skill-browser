"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Globe,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
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
  confirmImportSkill,
  previewSkillFromRawText,
  previewSkillFromUrl,
} from "@/domain/services/import-skill";

export function ImportSkillDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("url");
  const [url, setUrl] = useState("");
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<{
    skill: Skill;
    warnings: string[];
  } | null>(null);

  const { installSkill } = useSkillspace();
  const { success, error } = useToast();

  const handleInspect = async () => {
    setIsLoading(true);
    setPreview(null);

    try {
      if (activeTab === "url") {
        if (!url.trim()) {
          error("Please enter a valid HTTPS URL.");
          setIsLoading(false);
          return;
        }
        const res = await previewSkillFromUrl(url.trim());
        setPreview(res);
      } else {
        if (!rawText.trim()) {
          error("Please paste skill instructions or JSON manifest.");
          setIsLoading(false);
          return;
        }
        const res = previewSkillFromRawText(rawText);
        setPreview(res);
      }
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : "Failed to parse skill.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview) return;
    try {
      setIsLoading(true);
      await confirmImportSkill(preview.skill);
      installSkill(preview.skill);
      success(`Imported and added "${preview.skill.name}" to Skillspace`);
      handleReset();
      onClose();
    } catch (err: unknown) {
      error(
        err instanceof Error ? err.message : "Failed to save imported skill.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setRawText("");
    setPreview(null);
    setIsLoading(false);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      title={
        <div className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-[var(--accent)]" />
          <span>Import External Skill</span>
        </div>
      }
      description="Fetch an AI skill from a public HTTPS URL (e.g. GitHub raw file) or paste a custom Markdown manifest."
      maxWidth="lg"
      footer={
        preview ? (
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" size="sm" onClick={() => setPreview(null)}>
              Back to Input
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirm}
                isLoading={isLoading}
                className="gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Add to My Skillspace</span>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleInspect}
              isLoading={isLoading}
              className="gap-1.5"
            >
              <span>Inspect & Validate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </>
        )
      }
    >
      {!preview ? (
        <div className="space-y-4 py-2">
          <Tabs
            defaultValue="url"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-[var(--surface-muted)] p-1">
              <TabsTrigger value="url" className="gap-1.5 text-xs">
                <Globe className="w-3.5 h-3.5" />
                <span>HTTPS URL</span>
              </TabsTrigger>
              <TabsTrigger value="paste" className="gap-1.5 text-xs">
                <FileCode className="w-3.5 h-3.5" />
                <span>Raw Markdown / JSON</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="import-url"
                  className="text-xs font-mono text-[var(--text-muted)]"
                >
                  Remote Source URL *
                </label>
                <Input
                  id="import-url"
                  placeholder="https://raw.githubusercontent.com/.../SKILL.md"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-[var(--text-subtle)]">
                Supported sources: Public GitHub raw files, Gists, documentation
                pages. HTTPS required.
              </p>
            </TabsContent>

            <TabsContent value="paste" className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="import-paste"
                  className="text-xs font-mono text-[var(--text-muted)]"
                >
                  Paste Markdown / JSON Content *
                </label>
                <textarea
                  id="import-paste"
                  rows={8}
                  placeholder={`# My Custom AI Skill\n\nYou are a specialist in...\n\n## Instructions\n1. Follow best practices...`}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full p-3 text-xs font-mono bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-subtle)] border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
            <ShieldAlert className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-[var(--text)] block">
                Security & Sanitization Guard
              </span>
              <p className="text-[11px] text-[var(--text-subtle)] leading-relaxed">
                External skill instructions are untrusted data. Skill Browser
                automatically sanitizes scripts, iframes, and dangerous handlers
                before rendering.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Validation & Preview Screen */
        <div className="space-y-4 py-2">
          {/* Metadata Card */}
          <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-[var(--accent)] uppercase">
                {preview.skill.category}
              </span>
              <Badge variant="accent" size="sm">
                Validated
              </Badge>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-[var(--text)]">
                {preview.skill.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {preview.skill.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border)] grid grid-cols-3 gap-2 text-[11px] font-mono text-[var(--text-subtle)]">
              <div>
                <span className="block text-[var(--text-muted)]">Author:</span>
                {preview.skill.author}
              </div>
              <div>
                <span className="block text-[var(--text-muted)]">Version:</span>
                v{preview.skill.version}
              </div>
              <div>
                <span className="block text-[var(--text-muted)]">
                  Integrity:
                </span>
                <span className="text-[var(--success)]">Generated Hash</span>
              </div>
            </div>
          </div>

          {/* Warnings List */}
          {preview.warnings.length > 0 && (
            <div className="p-3 bg-[var(--warning-subtle)] border border-[var(--warning-border)] rounded-[var(--radius-md)] text-xs text-[var(--warning)] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Warnings</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {preview.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Instruction Preview */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-medium text-[var(--text-subtle)] uppercase tracking-wider">
              Sanitized Instruction Preview
            </span>
            <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] max-h-60 overflow-y-auto">
              <MarkdownViewer content={preview.skill.instructions} />
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
