import type {
  Collection,
  CollectionId,
  Skill,
  SkillId,
  SkillspaceItem,
  SkillspaceManifest,
} from "@/contracts";
import type { SkillspaceRepository } from "@/domain/repositories/skillspace-repository";

const DB_NAME = "SkillBrowserDB";
const DB_VERSION = 1;
const STORE_SKILLS = "skills";
const STORE_COLLECTIONS = "collections";

export class IndexedDbSkillspaceRepository implements SkillspaceRepository {
  private dbPromise: Promise<IDBDatabase | null> | null = null;

  private async getDb(): Promise<IDBDatabase | null> {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return null;
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve) => {
        try {
          const req = indexedDB.open(DB_NAME, DB_VERSION);

          req.onupgradeneeded = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_SKILLS)) {
              db.createObjectStore(STORE_SKILLS, { keyPath: "skill.id" });
            }
            if (!db.objectStoreNames.contains(STORE_COLLECTIONS)) {
              db.createObjectStore(STORE_COLLECTIONS, { keyPath: "id" });
            }
          };

          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      });
    }

    return this.dbPromise;
  }

  // LocalStorage Fallback Helpers
  private getLocalSkills(): SkillspaceItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("skill_browser_installed_items");
      if (raw) return JSON.parse(raw);
      // Legacy fallback
      const legacy = localStorage.getItem("skill_browser_installed_skills");
      if (legacy) {
        const parsed: Skill[] = JSON.parse(legacy);
        return parsed.map((s) => ({
          skill: s,
          installedAt: s.updatedAt || new Date().toISOString(),
          isFavorite: false,
          collectionIds: [],
        }));
      }
    } catch {}
    return [];
  }

  private saveLocalSkills(items: SkillspaceItem[]) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        "skill_browser_installed_items",
        JSON.stringify(items),
      );
      localStorage.setItem(
        "skill_browser_installed_skills",
        JSON.stringify(items.map((i) => i.skill)),
      );
      window.dispatchEvent(new Event("skillspace-updated"));
    } catch {}
  }

  private getLocalCollections(): Collection[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("skill_browser_collections");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: "core-stack",
        name: "Core AI Stack",
        description:
          "Primary skills for daily development and research workflows",
        skillIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  private saveLocalCollections(collections: Collection[]) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        "skill_browser_collections",
        JSON.stringify(collections),
      );
      window.dispatchEvent(new Event("skillspace-updated"));
    } catch {}
  }

  async listSkills(): Promise<SkillspaceItem[]> {
    const db = await this.getDb();
    if (!db) return this.getLocalSkills();

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_SKILLS, "readonly");
        const store = tx.objectStore(STORE_SKILLS);
        const req = store.getAll();

        req.onsuccess = () => {
          const items = req.result as SkillspaceItem[];
          if (!items || items.length === 0) {
            // sync with local storage if any
            resolve(this.getLocalSkills());
          } else {
            resolve(items);
          }
        };
        req.onerror = () => resolve(this.getLocalSkills());
      } catch {
        resolve(this.getLocalSkills());
      }
    });
  }

  async getSkill(id: SkillId): Promise<SkillspaceItem | null> {
    const all = await this.listSkills();
    return all.find((i) => i.skill.id === id) || null;
  }

  async addSkill(skill: Skill): Promise<void> {
    const item: SkillspaceItem = {
      skill,
      installedAt: new Date().toISOString(),
      isFavorite: false,
      collectionIds: [],
    };

    const current = this.getLocalSkills();
    const updated = [...current.filter((i) => i.skill.id !== skill.id), item];
    this.saveLocalSkills(updated);

    const db = await this.getDb();
    if (db) {
      try {
        const tx = db.transaction(STORE_SKILLS, "readwrite");
        const store = tx.objectStore(STORE_SKILLS);
        store.put(item);
      } catch {}
    }
  }

  async removeSkill(id: SkillId): Promise<void> {
    const current = this.getLocalSkills();
    const updated = current.filter((i) => i.skill.id !== id);
    this.saveLocalSkills(updated);

    const db = await this.getDb();
    if (db) {
      try {
        const tx = db.transaction(STORE_SKILLS, "readwrite");
        const store = tx.objectStore(STORE_SKILLS);
        store.delete(id);
      } catch {}
    }
  }

  async toggleFavorite(id: SkillId): Promise<boolean> {
    const current = this.getLocalSkills();
    let newFavState = false;
    const updated = current.map((item) => {
      if (item.skill.id === id) {
        newFavState = !item.isFavorite;
        return { ...item, isFavorite: newFavState };
      }
      return item;
    });
    this.saveLocalSkills(updated);
    return newFavState;
  }

  async listCollections(): Promise<Collection[]> {
    return this.getLocalCollections();
  }

  async createCollection(
    name: string,
    description?: string,
  ): Promise<Collection> {
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const newCol: Collection = {
      id: id || `col-${Date.now()}`,
      name,
      description,
      skillIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const current = this.getLocalCollections();
    const updated = [...current.filter((c) => c.id !== newCol.id), newCol];
    this.saveLocalCollections(updated);
    return newCol;
  }

  async deleteCollection(id: CollectionId): Promise<void> {
    const current = this.getLocalCollections();
    const updated = current.filter((c) => c.id !== id);
    this.saveLocalCollections(updated);
  }

  async addSkillToCollection(
    skillId: SkillId,
    collectionId: CollectionId,
  ): Promise<void> {
    const cols = this.getLocalCollections();
    const updatedCols = cols.map((col) => {
      if (col.id === collectionId && !col.skillIds.includes(skillId)) {
        return {
          ...col,
          skillIds: [...col.skillIds, skillId],
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    this.saveLocalCollections(updatedCols);
  }

  async removeSkillFromCollection(
    skillId: SkillId,
    collectionId: CollectionId,
  ): Promise<void> {
    const cols = this.getLocalCollections();
    const updatedCols = cols.map((col) => {
      if (col.id === collectionId) {
        return {
          ...col,
          skillIds: col.skillIds.filter((s) => s !== skillId),
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    this.saveLocalCollections(updatedCols);
  }

  async exportManifest(): Promise<SkillspaceManifest> {
    const skills = (await this.listSkills()).map((i) => i.skill);
    const collections = await this.listCollections();

    return {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      userIdentifier: "anonymous-local-skillspace",
      skills,
      collections,
    };
  }

  async importManifest(manifest: SkillspaceManifest): Promise<number> {
    let count = 0;
    for (const skill of manifest.skills) {
      await this.addSkill(skill);
      count++;
    }
    for (const col of manifest.collections) {
      const current = this.getLocalCollections();
      if (!current.some((c) => c.id === col.id)) {
        current.push(col);
        this.saveLocalCollections(current);
      }
    }
    return count;
  }
}

export const indexedDbSkillspaceRepository =
  new IndexedDbSkillspaceRepository();
