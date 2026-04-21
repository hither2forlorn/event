import { role } from "@/constant";
import Controller from "./controller";

const routes = [
  {
    method: "get",
    controller: Controller.listVehicles,
    path: "vehicle/event/:eventId",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "get",
    controller: Controller.getAssignmentsByVehicle,
    path: "vehicle/assign/:vehicleId",
    authorization: true

  },
  {
    method: "post",
    controller: Controller.create,
    path: "vehicle/:eventId",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "get",
    controller: Controller.findOne,
    path: "vehicle/:id",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "patch",
    controller: Controller.update,
    path: "vehicle/:id",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "delete",
    controller: Controller.deleteVehicle,
    path: "vehicle/:id",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "post",
    controller: Controller.assignVehicle,
    path: "vehicle/assign",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "patch",
    controller: Controller.updateAssignment,
    path: "vehicle/assign/:vehicleId/:invitationId",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "delete",
    controller: Controller.removeAssignment,
    path: "vehicle/assign/:vehicleId/:invitationId",
    authorization: true,
    authCheckType: [role.user],
  },
];

export default routes;
