import LogisticSchema from "@/modules/logistics/schema";
import UserRepository from "@/modules/user/repository"

const selectVehicle = {
  id: LogisticSchema.vehicleSchema.id,
  vehicleName: LogisticSchema.vehicleSchema.vehicleName,
  eventId: LogisticSchema.vehicleSchema.eventId,
  driverName: LogisticSchema.vehicleSchema.driverName,
  driverNumber: LogisticSchema.vehicleSchema.driverNumber,
  capacity: LogisticSchema.vehicleSchema.capacity,
  availablityStartTime: LogisticSchema.vehicleSchema.availablityStartTime,
  availablityEndTime: LogisticSchema.vehicleSchema.availablityEndTime,
  createdAt: LogisticSchema.vehicleSchema.createdAt,
  updatedAt: LogisticSchema.vehicleSchema.updatedAt,
};

const selectAssignedVehicle = {
  vehicleId: LogisticSchema.assignedVehicle.vehicleId,
  invitationId: LogisticSchema.assignedVehicle.invitationId,
  invitedUser: UserRepository.selectQuery,
  fromTime: LogisticSchema.assignedVehicle.fromTime,
  toTime: LogisticSchema.assignedVehicle.toTime,
  fromLocation: LogisticSchema.assignedVehicle.fromLocation,
  toLocation: LogisticSchema.assignedVehicle.toLocation,
  createdAt: LogisticSchema.assignedVehicle.createdAt,
  updatedAt: LogisticSchema.assignedVehicle.updatedAt,
};

const selectAssignedVehicleFields = {
  vehicleId: LogisticSchema.assignedVehicle.vehicleId,
  invitationId: LogisticSchema.assignedVehicle.invitationId,
  fromTime: LogisticSchema.assignedVehicle.fromTime,
  toTime: LogisticSchema.assignedVehicle.toTime,
  fromLocation: LogisticSchema.assignedVehicle.fromLocation,
  toLocation: LogisticSchema.assignedVehicle.toLocation,
  createdAt: LogisticSchema.assignedVehicle.createdAt,
  updatedAt: LogisticSchema.assignedVehicle.updatedAt,
};

const selectWithAssigned = {
  vehicle: selectVehicle,
  assignedVehicle: selectAssignedVehicleFields,
  invitedUser: UserRepository.selectQuery,
};

export default { selectVehicle, selectAssignedVehicle, selectWithAssigned };
