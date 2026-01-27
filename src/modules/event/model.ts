import db from "@/config/db";
import { sql, eq, or } from "drizzle-orm";
import event from "./schema"
import repository from "./repository";

import { EventColumn } from "./resource";

class Event {
  static async findAllAndCount(params: any) {
    const { page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const result = await db
      .select(repository.selectQuery)
      .from(event)
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(event);

    return {
      items: result,
      page,
      totalItems: parseInt(count.toString(), 10),
      totalPages: Math.ceil(count / limit),
    };
  }

  static async create(params: Partial<EventColumn>) {
    const result = await db
      .insert(event)
      .values(params as any)
      .returning();
    return result[0];
  }

  static async find(params: Partial<EventColumn>) {
    const { id, title } = params;
    const conditions = [];
    if (id !== undefined) {
      conditions.push(eq(event.id, id));
    }
    if (title !== undefined) {
      conditions.push(eq(event.title, title as string));
    }

    if (conditions.length === 0) return null;

    const result = await db
      .select()
      .from(event)
      .where(or(...conditions));
    return result[0] || null;
  }

  static async update(params: Partial<EventColumn>, id: number) {
    const result = await db
      .update(event)
      .set({ ...params, updatedAt: new Date() } as any)
      .where(eq(event.id, id))
      .returning();
    return result[0] || null;
  }

  static async destroy(id: number) {
    const result = await db.delete(event).where(eq(event.id, id)).returning();
    return result;
  }

  static async findByUser(userId: number, params: any) {
    const { page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const result = await db
      .select(repository.selectQuery)
      .from(event)
      .where(eq(event.organizer, userId))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(event)
      .where(eq(event.organizer, userId));

    return {
      items: result,
      page,
      totalItems: parseInt(count.toString(), 10),
      totalPages: Math.ceil(count / limit),
    };
  }
}

export default Event;
