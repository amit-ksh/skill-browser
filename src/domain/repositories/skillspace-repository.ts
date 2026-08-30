import type {
  Collection,
  CollectionId,
  Skill,
  SkillId,
  SkillspaceItem,
  SkillspaceManifest,
} from "@/contracts";

export interface SkillspaceRepository {
  listSkills(): Promise<SkillspaceItem[]>;
  getSkill(id: SkillId): Promise<SkillspaceItem | null>;
  addSkill(skill: Skill): Promise<void>;
  removeSkill(id: SkillId): Promise<void>;
  toggleFavorite(id: SkillId): Promise<boolean>;

  listCollections(): Promise<Collection[]>;
  createCollection(name: string, description?: string): Promise<Collection>;
  deleteCollection(id: CollectionId): Promise<void>;
  addSkillToCollection(
    skillId: SkillId,
    collectionId: CollectionId,
  ): Promise<void>;
  removeSkillFromCollection(
    skillId: SkillId,
    collectionId: CollectionId,
  ): Promise<void>;

  exportManifest(): Promise<SkillspaceManifest>;
  importManifest(manifest: SkillspaceManifest): Promise<number>;
}
