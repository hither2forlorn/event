import db from "@/config/db";
import { eq, and } from "drizzle-orm";
import LogisticSchema from "@/modules/logistics/schema";
import UserSchema from "@/modules/user/schema"
import Invitation from "@/modules/invitation/schema"
import repository from "./repository";
import { CreateVehicleType } from "@/modules/logistics/validators"

class Logistic {
  static async findAllVehicle(params: { eventId: number }) {
    const result = await db
      .select(repository.selectVehicle)
      .from(LogisticSchema.vehicle_schema)
      .where(eq(LogisticSchema.vehicle_schema.eventId, params.eventId));
    return result;
  }

  static async findAllVehicleWithAssigned(params: { eventId: number }) {
    const result = await db
      .select(repository.selectWithAssigned)
      .from(LogisticSchema.vehicle_schema)
      .leftJoin(
        LogisticSchema.assigned_vehicle,
        eq(LogisticSchema.vehicle_schema.id, LogisticSchema.assigned_vehicle.vehicleId)
      )
      .leftJoin(Invitation, eq(LogisticSchema.assigned_vehicle.invitationId, Invitation.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(eq(LogisticSchema.vehicle_schema.eventId, params.eventId));
    return result;
  }

  static async findAssignedVehicle(params: { vehicleId: number, invitationId: number }) {
    const result = await db
      .select(repository.selectAssignedVehicle)
      .from(LogisticSchema.assigned_vehicle)
      .leftJoin(Invitation, eq(LogisticSchema.assigned_vehicle.invitationId, Invitation.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(
        and(
          eq(LogisticSchema.assigned_vehicle.vehicleId, params.vehicleId),
          eq(LogisticSchema.assigned_vehicle.invitationId, params.invitationId)
        )
      );
    return result[0] || null;
  }

  static async listAllAssignedVehicle(params: { vehicleId: number }) {
    const result = await db
      .select(repository.selectWithAssigned)
      .from(LogisticSchema.assigned_vehicle).leftJoin(Invitation, eq(LogisticSchema.assigned_vehicle.invitationId, Invitation.id)).
      leftJoin(LogisticSchema.vehicle_schema, eq(LogisticSchema.assigned_vehicle.vehicleId, LogisticSchema.vehicle_schema.id))
      .leftJoin(UserSchema, eq(Invitation.userId, UserSchema.id))
      .where(eq(LogisticSchema.assigned_vehicle.vehicleId, params.vehicleId));
    return result;
  }

  static async find(params: { id: number }) {
    const result = await db
      .select(repository.selectVehicle)
      .from(LogisticSchema.vehicle_schema)
      .where(eq(LogisticSchema.vehicle_schema.id, params.id));
    return result[0] || null;
  }

  static async create_vehicle(params: CreateVehicleType, eventId: number) {
    const result = await db
      .insert(LogisticSchema.vehicle_schema)
      .values({ ...params, eventId: eventId })
      .returning();
    return result[0];
  }

  static async assign_vehicle(params: any) {
    const result = await db
      .insert(LogisticSchema.assigned_vehicle)
      .values(params)
      .returning();
    return result[0];
  }

  static async update(params: any, id: number) {
    const result = await db
      .update(LogisticSchema.vehicle_schema)
      .set({ ...params, updatedAt: new Date() })
      .where(eq(LogisticSchema.vehicle_schema.id, id))
      .returning();
    return result[0];
  }

  static async update_assigned_vehicle(params: any, vehicleId: number, invitationId: number) {
    const result = await db
      .update(LogisticSchema.assigned_vehicle)
      .set({ ...params, updatedAt: new Date() })
      .where(
        and(
          eq(LogisticSchema.assigned_vehicle.vehicleId, vehicleId),
          eq(LogisticSchema.assigned_vehicle.invitationId, invitationId)
        )
      )
      .returning();
    return result[0];
  }

  static async delete_vehicle(id: number) {
    const result = await db
      .delete(LogisticSchema.vehicle_schema)
      .where(eq(LogisticSchema.vehicle_schema.id, id))
      .returning();
    return result[0];
  }

  static async remove_assigned_vehicle(vehicleId: number, invitationId: number) {
    const result = await db
      .delete(LogisticSchema.assigned_vehicle)
      .where(
        and(
          eq(LogisticSchema.assigned_vehicle.vehicleId, vehicleId),
          eq(LogisticSchema.assigned_vehicle.invitationId, invitationId)
        )
      )
      .returning();
    return result[0];
  }
}

export default Logistic;
