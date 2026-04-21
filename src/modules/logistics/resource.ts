import type { UserColumn } from "@/modules/user/resource";

export interface EventVehicle {
    id: number | undefined;
    vehicleName: string ;
    eventId: number ;
    driverName: string | undefined | null;
    driverNumber: string  |undefined | null;
    capacity: number | undefined | null;
    availablityStartTime: Date | undefined | null;
    availablityEndTime: Date | undefined | null;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}

export interface AssignedVehicle {
    vehicleId: number ;
    invitationId: number ;
    pickupTime: Date | undefined | null;
    dropoffTime: Date | undefined | null;
    pickupLocation: string | undefined |null;
    dropoffLocation: string | undefined |null;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}

export interface VehicleWithAssignment {
    vehicle: Partial<EventVehicle> | null;
    assigned_vehicle: Partial<AssignedVehicle> | null;
    invited_user: Partial<UserColumn> | null;
}

class Resource {
    static vehicleToJson(vehicle: Partial<EventVehicle> | null | undefined): Partial<EventVehicle> | null {
        if (!vehicle) return null;
        return {
            id: vehicle.id,
            vehicleName: vehicle.vehicleName,
            eventId: vehicle.eventId,
            driverName: vehicle.driverName,
            driverNumber: vehicle.driverNumber,
            capacity: vehicle.capacity,
            availablityStartTime: vehicle.availablityStartTime,
            availablityEndTime: vehicle.availablityEndTime,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
        };
    }

    static vehicleCollection(vehicles: (Partial<EventVehicle> | null | undefined)[]) {
        return vehicles.map(v => this.vehicleToJson(v)).filter((v): v is Partial<EventVehicle> => v !== null);
    }

    static assignmentToJson(assignment: Partial<AssignedVehicle> | null | undefined): Partial<AssignedVehicle> | null {
        if (!assignment) return null;
        return {
            vehicleId: assignment.vehicleId,
            invitationId: assignment.invitationId,
            pickupTime: assignment.pickupTime,
            dropoffTime: assignment.dropoffTime,
            pickupLocation: assignment.pickupLocation,
            dropoffLocation: assignment.dropoffLocation,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        };
    }

    static assignmentWithVehicleToJson(assignment: Partial<VehicleWithAssignment> | null | undefined): Partial<VehicleWithAssignment> | null {
        if (!assignment) return null;
        return {
            vehicle: this.vehicleToJson(assignment.vehicle),
            assigned_vehicle: this.assignmentToJson(assignment.assigned_vehicle),
            invited_user: assignment.invited_user ?? null,
        };
    }

    static assignmentCollection(assignments: (Partial<VehicleWithAssignment> | null | undefined)[]) {
        return assignments
            .map(a => this.assignmentWithVehicleToJson(a))
            .filter((a): a is Partial<VehicleWithAssignment> => a !== null);
    }
}

export default Resource;
