import db from "@/config/db";
import catering from "./schema";
import Repository from "./repository";
import { eq, sql, desc } from "drizzle-orm";
import type { CateringColumn, MenuItemColumn } from "./resource";

class Catering {
  static async createCatering(
    params: Partial<CateringColumn> & { eventId: number },
  ) {
    try {
      const result = await db
        .insert(catering.schema)
        .values(params as any)
        .returning();
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async listCaterings(params: {
    eventId: number;
    page?: number;
    limit?: number;
  }) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (Number(page) - 1) * Number(limit);

      const items = await db
        .select(Repository.cateringSelectQuery)
        .from(catering.schema)
        .where(eq(catering.schema.eventId, params.eventId))
        .orderBy(desc(catering.schema.createdAt))
        .limit(Number(limit))
        .offset(offset);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(catering.schema)
        .where(eq(catering.schema.eventId, params.eventId));

      const count = Number(countResult[0]?.count ?? 0);

      return {
        items,
        page: Number(page),
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  static async findCateringById(id: number): Promise<CateringColumn | null> {
    try {
      const result = await db
        .select(Repository.cateringSelectQuery)
        .from(catering.schema)
        .where(eq(catering.schema.id, id));
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async updateCatering(
    id: number,
    params: Partial<CateringColumn>,
  ): Promise<CateringColumn | null> {
    try {
      const result = await db
        .update(catering.schema)
        .set({ ...params, updatedAt: new Date() } as any)
        .where(eq(catering.schema.id, id))
        .returning();
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCatering(id: number) {
    try {
      const result = await db
        .delete(catering.schema)
        .where(eq(catering.schema.id, id))
        .returning();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createMenuItem(
    params: Partial<MenuItemColumn> & { cateringId: number },
  ): Promise<MenuItemColumn | null> {
    try {
      const result = await db
        .insert(catering.menuSchema)
        .values(params as any)
        .returning();
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async listMenuItems(cateringId: number): Promise<MenuItemColumn[]> {
    try {
      const result = await db
        .select(Repository.menuSelectQuery)
        .from(catering.menuSchema)
        .where(eq(catering.menuSchema.cateringId, cateringId))
        .orderBy(desc(catering.menuSchema.createdAt));
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findMenuItemById(id: number): Promise<MenuItemColumn | null> {
    try {
      const result = await db
        .select(Repository.menuSelectQuery)
        .from(catering.menuSchema)
        .where(eq(catering.menuSchema.id, id));
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async updateMenuItem(
    id: number,
    params: Partial<MenuItemColumn>,
  ): Promise<MenuItemColumn | null> {
    try {
      const result = await db
        .update(catering.menuSchema)
        .set({ ...params, updatedAt: new Date() } as any)
        .where(eq(catering.menuSchema.id, id))
        .returning();
      return result[0] ?? null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMenuItem(id: number) {
    try {
      const result = await db
        .delete(catering.menuSchema)
        .where(eq(catering.menuSchema.id, id))
        .returning();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default Catering;
