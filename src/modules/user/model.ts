import db from "@/config/db";
import users from "./schema";
import type { UserColumn } from "./resource";
import Repository from "./repository";
import { sql, not, eq, or } from "drizzle-orm";

class User {
  static async findAllAndCount(params: any) {
    const { page, limit } = params;
    const offset = (page - 1) * limit;
    const result = await db
      .select(Repository.selectQuery as any)
      .from(users)
      .where(not(eq(users.id, 1)))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(not(eq(users.id, 1)));
    return {
      items: result,
      page,
      totalItems: parseInt(count.toString(), 10),
      totalPages: Math.ceil(count / limit),
    };
  }

  static async create(params: UserColumn) {
    const result = await db.insert(users).values(params).returning();
    return result[0];
  }

  static async find(params: Partial<UserColumn>) {
    const { id, email } = params;
    const conditions = [];
    if (id !== undefined) {
      conditions.push(eq(users.id, id));
    }
    if (email !== undefined) {
      conditions.push(eq(users.email, email));
    }

    if (conditions.length === 0) {
      return null;
    }

    const result = await db
      .select()
      .from(users)
      .where(conditions.length === 1 ? conditions[0] : or(...conditions));
    return result[0] || null;
  }
  static async update(
    params: Partial<UserColumn | { password: string }>,
    id: number,
  ) {
    const result: any = await db
      .update(users)
      .set(params)
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }
  static async destroy(id: number) {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result;
  }
}

export default User;
