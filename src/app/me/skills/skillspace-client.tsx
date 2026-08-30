"use client";

import { Bookmark, Compass, Folder, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SkillCard } from "@/components/skills/skill-card";
import { CollectionDialog } from "@/components/skillspace/collection-dialog";
import { ShareSkillspaceDialog } from "@/components/skillspace/share-skillspace-dialog";
import { SkillspaceHeader } from "@/components/skillspace/skillspace-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import type { Collection } from "@/contracts";
import { useSkillspace } from "@/domain/hooks/use-skillspace";
import {
  deleteCollection,
  listCollections,
} from "@/domain/services/collection-services";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export function SkillspaceClient() {
  const { installedSkills } = useSkillspace();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { success, info } = useToast();

  const loadCollections = useCallback(async () => {
    const list = await listCollections();
    setCollections(list);
  }, []);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  const handleExport = async () => {
    const manifest = await indexedDbSkillspaceRepository.exportManifest();
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skillspace-manifest-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    success("Downloaded skillspace-manifest.json");
  };

  const handleDeleteCollection = async (id: string, name: string) => {
    await deleteCollection(id);
    info(`Deleted collection "${name}"`);
    loadCollections();
  };

  // Filter installed skills
  const filteredSkills = installedSkills.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Skillspace Top Banner */}
      <SkillspaceHeader
        skillCount={installedSkills.length}
        collectionCount={collections.length}
        onOpenCreateCollection={() => setIsCreateCollectionOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onExport={handleExport}
      />

      {/* Main Tabs */}
      <Tabs defaultValue="all-skills" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList className="bg-[var(--surface)] p-1 border border-[var(--border)]">
            <TabsTrigger value="all-skills" className="gap-1.5 text-xs">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Installed Skills ({installedSkills.length})</span>
            </TabsTrigger>
            <TabsTrigger value="collections" className="gap-1.5 text-xs">
              <Folder className="w-3.5 h-3.5" />
              <span>Collections ({collections.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Quick Search */}
          <div className="w-full sm:w-64">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search installed..."
              icon={<Search className="w-3.5 h-3.5" />}
              className="h-8 text-xs"
            />
          </div>
        </div>

        {/* Tab 1: Installed Skills */}
        <TabsContent value="all-skills" className="space-y-4">
          {filteredSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)]/30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)]">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  No installed skills yet
                </h3>
                <p className="text-xs text-[var(--text-muted)] max-w-sm">
                  Explore the public skill registry to add your first skill or
                  import a custom manifest.
                </p>
              </div>
              <Link href="/skills">
                <Button size="sm" className="gap-1.5 text-xs">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Browse All Skills</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Collections */}
        <TabsContent value="collections" className="space-y-4">
          {collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)]/30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--accent)]">
                <Folder className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  No collections created
                </h3>
                <p className="text-xs text-[var(--text-muted)] max-w-sm">
                  Create collections to group skills for specific workflows or
                  agent personalities.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateCollectionOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Collection</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collections.map((col) => (
                <Card
                  key={col.id}
                  className="bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] transition-all"
                >
                  <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-[var(--accent)]" />
                        <CardTitle className="text-sm font-semibold">
                          {col.name}
                        </CardTitle>
                      </div>
                      {col.description && (
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {col.description}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCollection(col.id, col.name)}
                      className="h-7 w-7 text-[var(--text-subtle)] hover:text-[var(--danger)]"
                      title="Delete collection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </CardHeader>

                  <CardContent className="p-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-subtle)]">
                    <span>{col.skillIds.length} skills in collection</span>
                    <Badge variant="neutral" size="sm">
                      {col.id}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Collection Dialog */}
      <CollectionDialog
        isOpen={isCreateCollectionOpen}
        onClose={() => setIsCreateCollectionOpen(false)}
        onCreated={loadCollections}
      />

      {/* Share Dialog */}
      <ShareSkillspaceDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        skillCount={installedSkills.length}
      />
    </div>
  );
}
