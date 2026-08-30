"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { createCollection } from "@/domain/services/collection-services";

export function CollectionDialog({
  isOpen,
  onClose,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error("Collection name is required");
      return;
    }

    try {
      setIsLoading(true);
      await createCollection(name, description);
      success(`Created collection "${name}"`);
      setName("");
      setDescription("");
      onCreated();
      onClose();
    } catch {
      error("Failed to create collection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Skill Collection"
      description="Organize your installed skills into specialized collections for agents (e.g. Next.js Stack, Growth Marketing, Prompt Auditing)."
      footer={
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
            onClick={handleCreate}
            isLoading={isLoading}
          >
            Create Collection
          </Button>
        </>
      }
    >
      <form onSubmit={handleCreate} className="space-y-4 py-2">
        <div className="space-y-1.5">
          <label
            htmlFor="col-name"
            className="text-xs font-mono text-[var(--text-muted)]"
          >
            Collection Name *
          </label>
          <Input
            id="col-name"
            placeholder="e.g. Full-Stack Architect Stack"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="col-desc"
            className="text-xs font-mono text-[var(--text-muted)]"
          >
            Description (Optional)
          </label>
          <Input
            id="col-desc"
            placeholder="Briefly describe what tasks this collection serves..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </Dialog>
  );
}
