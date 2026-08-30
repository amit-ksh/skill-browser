import type { Collection, CollectionId, SkillId } from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";
import { indexedDbSkillspaceRepository } from "@/infrastructure/repositories/indexeddb-skillspace-repository";

export async function listCollections(
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<Collection[]> {
  return repo.listCollections();
}

export async function createCollection(
  name: string,
  description?: string,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<Collection> {
  if (!name.trim()) throw new Error("Collection name cannot be empty");
  return repo.createCollection(name.trim(), description?.trim());
}

export async function deleteCollection(
  id: CollectionId,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  return repo.deleteCollection(id);
}

export async function assignSkillToCollection(
  skillId: SkillId,
  collectionId: CollectionId,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  return repo.addSkillToCollection(skillId, collectionId);
}

export async function removeSkillFromCollection(
  skillId: SkillId,
  collectionId: CollectionId,
  repo: SkillspaceRepository = indexedDbSkillspaceRepository,
): Promise<void> {
  return repo.removeSkillFromCollection(skillId, collectionId);
}
