import db from "@/config/db";
import { eq, and } from "drizzle-orm";
import LogisticSchema from "@/modules/logistics/schema";
import UserSchema from "@/modules/user/schema"
import Invitation from "@/modules/invitation/schema"
import repository from "./repository";
import { AssignVehicleType, CreateVehicleType } from "@/modules/logistics/validators"

class Logistic {
  static async findAllVehicle(params: { eventId: number }) {
    const result = await db
      .select(repository.selectVehicle)
      .from(LogisticSchema.vehicleSchema)
      .where(eq(LogisticSchema.vehicleSchema.eventId, params.eventId));
    return result;
  }

  static async findAllVehicleWithAssigned(params: { eventId: number }) {
    const result = await db
      .select(repository.selectWithAssigned)
      .from(LogisticSchema.vehicleSchema)
      .leftJoin(
        LogisticSchema.assignedVehicle,
        eq(LogisticSchema.vehicleSchema.id, LogisticSchema.assignedVehicle.vehicleId)
      )
      .leftJoin(Invitation, eq(LogisticSchema.assignedVehicle.invitationId, Invitation.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(eq(LogisticSchema.vehicleSchema.eventId, params.eventId));
    return result;
  }

  static async findAssignedVehicle(params: { vehicleId: number, invitationId: number }) {
    const result = await db
      .select(repository.selectAssignedVehicle)
      .from(LogisticSchema.assignedVehicle)
      .leftJoin(Invitation, eq(LogisticSchema.assignedVehicle.invitationId, Invitation.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(
        and(
          eq(LogisticSchema.assignedVehicle.vehicleId, params.vehicleId),
          eq(LogisticSchema.assignedVehicle.invitationId, params.invitationId)
        )
      );
    return result[0] || null;
  }

  static async listAllAssignedVehicle(params: { vehicleId: number }) {
    const result = await db
      .select(repository.selectWithAssigned)
      .from(LogisticSchema.assignedVehicle).leftJoin(Invitation, eq(LogisticSchema.assignedVehicle.invitationId, Invitation.id)).
      leftJoin(LogisticSchema.vehicleSchema, eq(LogisticSchema.assignedVehicle.vehicleId, LogisticSchema.vehicleSchema.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(eq(LogisticSchema.assignedVehicle.vehicleId, params.vehicleId));
    return result;
  }

  static async find(params: { id: number }) {
    const result = await db
      .select(repository.selectVehicle)
      .from(LogisticSchema.vehicleSchema)
      .where(eq(LogisticSchema.vehicleSchema.id, params.id));
    return result[0] || null;
  }

  static async createVehicle(params: CreateVehicleType, eventId: number) {
    const result = await db
      .insert(LogisticSchema.vehicleSchema)
      .values({ ...params, eventId: eventId })
      .returning();
    return result[0];
  }

  static async assignVehicle(params: AssignVehicleType) {
    const result = await db
      .insert(LogisticSchema.assignedVehicle)
      .values(params)
      .returning();
    return result[0];
  }

  static async update(params: any, id: number) {
    const result = await db
      .update(LogisticSchema.vehicleSchema)
      .set({ ...params, updatedAt: new Date() })
      .where(eq(LogisticSchema.vehicleSchema.id, id))
      .returning();
    return result[0];
  }

  static async updateAssignedVehicle(params: any, vehicleId: number, invitationId: number) {
    const result = await db
      .update(LogisticSchema.assignedVehicle)
      .set({ ...params, updatedAt: new Date() })
      .where(
        and(
          eq(LogisticSchema.assignedVehicle.vehicleId, vehicleId),
          eq(LogisticSchema.assignedVehicle.invitationId, invitationId)
        )
      )
      .returning();
    return result[0];
  }

  static async deleteVehicle(id: number) {
    const result = await db
      .delete(LogisticSchema.vehicleSchema)
      .where(eq(LogisticSchema.vehicleSchema.id, id))
      .returning();
    return result[0];
  }

  static async removeAssignedVehicle(vehicleId: number, invitationId: number) {
    const result = await db
      .delete(LogisticSchema.assignedVehicle)
      .where(
        and(
          eq(LogisticSchema.assignedVehicle.vehicleId, vehicleId),
          eq(LogisticSchema.assignedVehicle.invitationId, invitationId)
        )
      )
      .returning();
    return result[0];
  }
}

export default Logistic;
