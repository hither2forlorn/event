import Model from "./model";
import { createVehicleValidation } from "./validators";
import Resource from "./resource";
import EventService from "@/modules/event/service";
import logger from "@/config/logger";
import { throwErrorOnValidation } from "@/utils/error";

/**
 * Service to handle logistics (vehicles and assignments)
 */

const listVehicles = async (eventId: number, userId: number) => {
  try {
    await EventService.checkAuthorized(eventId, userId);
    const data = await Model.findAllVehicle({ eventId });
    const result = Resource.vehicleCollection(data);
    logger.debug(result);
    return result;
  } catch (err: any) {
    logger.error("Error in listVehicles:", err);
    throw err;
  }
};

const listVehiclesWithAssignments = async (eventId: number, userId: number) => {
  try {
    await EventService.checkAuthorized(eventId, userId);
    const data = await Model.findAllVehicleWithAssigned({ eventId });
    // Note: The mapping here might need to be more sophisticated depending on the grouped result structure
    return data;
  } catch (err: any) {
    logger.error("Error in listVehiclesWithAssignments:", err);
    throw err;
  }
};

const findVehicle = async (id: number) => {
  try {
    const data = await Model.find({ id });
    if (!data) throw new Error("Vehicle not found");
    return Resource.vehicleToJson(data);
  } catch (err: any) {
    logger.error("Error in findVehicle:", err);
    throw err;
  }
};

const createVehicle = async (input: any, userId: number, eventId: number) => {
  try {
    const { data: validateData, error } = createVehicleValidation.safeParse(input);
    if (error || !validateData || validateData == undefined) {
      return throwErrorOnValidation("Error while validating the data");
    }
    await EventService.checkAuthorized(eventId, userId);
    const result = await Model.create_vehicle(validateData, eventId);
    return Resource.vehicleToJson(result);
  } catch (err: any) {
    logger.error("Error in createVehicle:", err);
    throw err;
  }
};

const updateVehicle = async (id: number, input: any, userId: number) => {
  try {
    const vehicle = await Model.find({ id });
    if (!vehicle) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    const data = await Model.update(input, id);
    return Resource.vehicleToJson(data);
  } catch (err: any) {
    logger.error("Error in updateVehicle:", err);
    throw err;
  }
};

const deleteVehicle = async (id: number, userId: number) => {
  try {
    const vehicle = await Model.find({ id });
    if (!vehicle) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    const data = await Model.delete_vehicle(id);
    return Resource.vehicleToJson(data);
  } catch (err: any) {
    logger.error("Error in deleteVehicle:", err);
    throw err;
  }
};

const assignVehicle = async (input: any, userId: number) => {
  try {
    const vehicle = await Model.find({ id: input.vehicleId });
    if (!vehicle || !vehicle.eventId) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    // TODO: Logical dilemma - Should we check if the invitation belongs to the same event?

    const data = await Model.assign_vehicle(input);
    return Resource.assignmentToJson(data);
  } catch (err: any) {
    logger.error("Error in assignVehicle:", err);
    throw err;
  }
};

const updateAssignment = async (vehicleId: number, invitationId: number, input: any, userId: number) => {
  try {
    const vehicle = await Model.find({ id: vehicleId });
    if (!vehicle) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    const data = await Model.update_assigned_vehicle(input, vehicleId, invitationId);
    return Resource.assignmentToJson(data);
  } catch (err: any) {
    logger.error("Error in updateAssignment:", err);
    throw err;
  }
};

const removeAssignment = async (vehicleId: number, invitationId: number, userId: number) => {
  try {
    const vehicle = await Model.find({ id: vehicleId });
    if (!vehicle) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    const data = await Model.remove_assigned_vehicle(vehicleId, invitationId);
    return Resource.assignmentToJson(data);
  } catch (err: any) {
    logger.error("Error in removeAssignment:", err);
    throw err;
  }
};

const listAssignmentsByVehicle = async (vehicleId: number, userId: number) => {
  try {
    const vehicle = await Model.find({ id: vehicleId });
    if (!vehicle) throw new Error("Vehicle not found");
    await EventService.checkAuthorized(vehicle.eventId, userId);

    const data = await Model.listAllAssignedVehicle({ vehicleId });
    return Resource.assignmentCollection(data);
  } catch (err: any) {
    logger.error("Error in listAssignmentsByVehicle:", err);
    throw err;
  }
};

export default {
  listVehicles,
  listVehiclesWithAssignments,
  findVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  assignVehicle,
  updateAssignment,
  removeAssignment,
  listAssignmentsByVehicle,
};
