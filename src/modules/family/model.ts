import db from "@/config/db/index";
import families from "./schema";
import type { FamilyInsert } from "./resource";
import Repository from "./repository";
import { eq } from "drizzle-orm";

class Family {
  static async create(params: FamilyInsert) {
    const result = await db.insert(families).values(params).returning();

    return result[0];
  }

  static async find(params: number) {
    const family = await db
      .select(Repository.selectQuery)
      .from(families)
      .where(eq(families.id, params));

    return family[0] || null;
  }

  static async update(params: Partial<FamilyInsert>, id: number) {
    const result = await db
      .update(families)
      .set({ ...params, updatedAt: new Date() } as any)
      .where(eq(families.id, id))
      .returning();
    return result[0] || null;
  }

  static async destroy(id: number) {
    const result = await db
      .delete(families)
      .where(eq(families.id, id))
      .returning();
    return result;
  }
}

export default Family;
