import db from "@/config/db/index";
import { family, family_member_schema } from "./schema";
import type { FamilyInsert } from "./resource";
import Repository from "./repository";
import { and, eq } from "drizzle-orm";
import {
  type AddMemberValidation,
  type UpdateMemberValidation,
} from "./validators";

class Family {
  static async create(params: FamilyInsert) {
    const result = await db.insert(family).values(params).returning();

    return result[0];
  }

  static async find(params: number) {
    const returnedFamily = await db
      .select(Repository.selectQuery)
      .from(family)
      .where(eq(family.id, params));

    return returnedFamily[0] || null;
  }

  static async update(params: Partial<FamilyInsert>, id: number) {
    const result = await db
      .update(family)
      .set({ ...params, updatedAt: new Date() } as any)
      .where(eq(family.id, id))
      .returning();
    return result[0] || null;
  }

  static async destroy(id: number) {
    const result = await db.delete(family).where(eq(family.id, id)).returning();
    return result;
  }

  static async addMemberIfUser(
    familyId: number,
    addedBy: number,
    addedMemberId: number,
    params: AddMemberValidation["body"],
  ) {
    const result = await db
      .insert(family_member_schema)
      .values({
        familyId,
        addedBy,
        userId: addedMemberId,
        ...params,
        dob: new Date(params.dob),
      })
      .returning();

    return result[0];
  }

  static async getMembers(familyId: number) {
    return db
      .select(Repository.selectMemersQuery)
      .from(family_member_schema)
      .where(eq(family_member_schema.familyId, familyId));
  }

  static async getMember(familyId: number, memberId: number) {
    const result = await db
      .select(Repository.selectMemersQuery)
      .from(family_member_schema)
      .where(
        and(
          eq(family_member_schema.familyId, familyId),
          eq(family_member_schema.userId, memberId),
        ),
      );

    return result[0] || null;
  }

  static async updateMember(
    familyId: number,
    memberId: number,
    params: UpdateMemberValidation["body"],
  ) {
    const payload = {
      ...params,
      dob: params.dob ? new Date(params.dob) : undefined,
      updatedAt: new Date(),
    };

    const result = await db
      .update(family_member_schema)
      .set(payload)
      .where(
        and(
          eq(family_member_schema.familyId, familyId),
          eq(family_member_schema.userId, memberId),
        ),
      )
      .returning();

    return result[0] || null;
  }

  static async removeMember(familyId: number, memberId: number) {
    const result = await db
      .delete(family_member_schema)
      .where(
        and(
          eq(family_member_schema.familyId, familyId),
          eq(family_member_schema.userId, memberId),
        ),
      )
      .returning();

    return result[0] || null;
  }
}

export default Family;
