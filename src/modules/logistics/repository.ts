import LogisticSchema from "@/modules/logistics/schema";

const selectVehicle = {
  id: LogisticSchema.vehicle_schema.id,
  vehicleName: LogisticSchema.vehicle_schema.vehicleName,
  eventId: LogisticSchema.vehicle_schema.eventId,
  driverName: LogisticSchema.vehicle_schema.driverName,
  driverNumber: LogisticSchema.vehicle_schema.driverNumber,
  capacity: LogisticSchema.vehicle_schema.capacity,
  availablityStartTime: LogisticSchema.vehicle_schema.availablityStartTime,
  availablityEndTime: LogisticSchema.vehicle_schema.availablityEndTime,
  createdAt: LogisticSchema.vehicle_schema.createdAt,
  updatedAt: LogisticSchema.vehicle_schema.updatedAt,
};

const selectAssignedVehicle = {
  vehicleId: LogisticSchema.assigned_vehicle.vehicleId,
  invitationId: LogisticSchema.assigned_vehicle.invitationId,
  pickupTime: LogisticSchema.assigned_vehicle.pickupTime,
  dropoffTime: LogisticSchema.assigned_vehicle.dropoffTime,
  pickupLocation: LogisticSchema.assigned_vehicle.pickupLocation,
  dropoffLocation: LogisticSchema.assigned_vehicle.dropoffLocation,
  createdAt: LogisticSchema.assigned_vehicle.createdAt,
  updatedAt: LogisticSchema.assigned_vehicle.updatedAt,
};

const selectWithAssigned = {
  vehicle: selectVehicle,
  assigned_vehicle: selectAssignedVehicle,
};

export default { selectVehicle, selectAssignedVehicle, selectWithAssigned };