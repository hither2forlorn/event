import db from "@/config/db";
import { sql, eq, or } from "drizzle-orm";
import event from "./schema";
import { eventUserSchema } from "./schema";
import repository from "./repository";

import { EventColumn } from "./resource";
import { user } from "@/config/db/schema";

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
      .from(eventUserSchema)
      .where(eq(eventUserSchema.userId, userId))
      .leftJoin(event, eq(event.id, eventUserSchema.eventId))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(eventUserSchema)
      .where(eq(eventUserSchema.userId, userId));

    return {
      items: result,
      page,
      totalItems: parseInt(count.toString(), 10),
      totalPages: Math.ceil(count / limit),
    };
  }

  static async getUserRelatedToEvent(eventId: number) {
    const result = await db
      .select(repository.selectQueryForUserRelatedToEvent)
      .from(eventUserSchema)
      .where(eq(eventUserSchema.eventId, eventId))
      .leftJoin(user, eq(user.id, eventUserSchema.userId));
    return result;
  }

  static async createEventUserRelation(params: {
    eventId: number;
    userId: number;
    role: string;
  }) {
    const result = await db.insert(eventUserSchema).values(params).returning();
    return result[0];
  }
}

export default Event;
