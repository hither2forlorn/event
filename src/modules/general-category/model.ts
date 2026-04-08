import db from "@/config/db";
import { and, eq, sql } from "drizzle-orm";
import generalCategory from "./schema";
import repository from "./repository";
import type { GeneralCategoryColumn } from "./resource";

class GeneralCategory {
  static async findAllAndCount(params: any) {
    const conditions = [] as any[];

    if (params?.type !== undefined && params?.type !== null) {
      conditions.push(eq(generalCategory.type, params.type));
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const baseQuery = db.select(repository.selectQuery).from(generalCategory);

    const result = whereClause
      ? await baseQuery.where(whereClause)
      : await baseQuery;

    const baseCountQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(generalCategory);

    const [{ count }]: any = whereClause
      ? await baseCountQuery.where(whereClause)
      : await baseCountQuery;

    return {
      items: result,
      totalItems: parseInt(count.toString(), 10),
    };
  }

  static async find(params: Partial<GeneralCategoryColumn>) {
    const conditions = [] as any[];

    if (params?.id !== undefined) {
      conditions.push(eq(generalCategory.id, params.id));
    }
    if (params?.name !== undefined && params?.name !== null) {
      conditions.push(eq(generalCategory.name, params.name));
    }
    if (params?.type !== undefined && params?.type !== null) {
      conditions.push(eq(generalCategory.type, params.type));
    }

    if (conditions.length === 0) return null;

    const result = await db
      .select(repository.selectQuery)
      .from(generalCategory)
      .where(and(...conditions));

    return result[0] || null;
  }

  static async create(params: Partial<GeneralCategoryColumn>) {
    const result = await db
      .insert(generalCategory)
      .values(params as any)
      .returning();
    return result[0] || null;
  }

  static async update(params: Partial<GeneralCategoryColumn>, id: number) {
    const result = await db
      .update(generalCategory)
      .set({ ...params } as any)
      .where(eq(generalCategory.id, id))
      .returning();
    return result[0] || null;
  }

  static async delete(id: number) {
    const result = await db
      .delete(generalCategory)
      .where(eq(generalCategory.id, id));
    return result;
  }
}

export default GeneralCategory;
