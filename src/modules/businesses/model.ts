import db from "@/config/db";
import { eq, sql, and } from "drizzle-orm";
import businessSchema from "./schema";
import { BusinessColumn } from "./resource";

class Business {
  static async findAllAndCount(params: any) {
    const { page = 1, limit = 10, userId, category, status } = params;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (userId) {
      conditions.push(eq(businessSchema.userId, userId));
    }
    if (category) {
      conditions.push(eq(businessSchema.category, category));
    }
    if (status) {
      conditions.push(eq(businessSchema.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select()
      .from(businessSchema)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(businessSchema)
      .where(whereClause);

    return {
      items: result,
      page,
      totalItems: parseInt(count.toString(), 10),
      totalPages: Math.ceil(count / limit),
    };
  }

  static async create(params: BusinessColumn) {
    const result = await db
      .insert(businessSchema)
      .values(params as any)
      .returning();
    return result[0];
  }

  static async find(params: Partial<BusinessColumn>) {
    const { id, business_name, email, userId } = params;
    const conditions = [];

    if (id !== undefined) {
      conditions.push(eq(businessSchema.id, id));
    }
    if (business_name !== undefined) {
      conditions.push(eq(businessSchema.business_name, business_name));
    }
    if (email !== undefined && email !== null) {
      conditions.push(eq(businessSchema.email, email));
    }
    if (userId !== undefined) {
      conditions.push(eq(businessSchema.userId, userId));
    }

    if (conditions.length === 0) return null;

    const result = await db
      .select()
      .from(businessSchema)
      .where(and(...conditions));
    return result[0] || null;
  }

  static async update(params: Partial<BusinessColumn>, id: number) {
    const result = await db
      .update(businessSchema)
      .set({ ...params, updatedAt: new Date() } as any)
      .where(eq(businessSchema.id, id))
      .returning();
    return result[0] || null;
  }

  static async destroy(id: number) {
    const result = await db
      .delete(businessSchema)
      .where(eq(businessSchema.id, id))
      .returning();
    return result;
  }

  static async findByUser(userId: number) {
    const result = await db
      .select()
      .from(businessSchema)
      .where(eq(businessSchema.userId, userId));
    return result;
  }
}

export default Business;
