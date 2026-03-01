import { role } from "@/constant";
import Controller from "./controller";

const routes = [
  {
    method: "get",
    controller: Controller.get,
    path: "business",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "post",
    controller: Controller.create,
    path: "business",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "get",
    controller: Controller.listMyBusinesses,
    path: "business/my-businesses",
    authorization: true,
    authCheckType: [role.user],
  },
  // ─── Bare :id routes (always last) ───────────────────────
  {
    method: "get",
    controller: Controller.findOne,
    path: "business/:id",
  },
  {
    method: "patch",
    controller: Controller.update,
    path: "business/:id",
    authorization: true,
    authCheckType: [role.user],
  },
  {
    method: "delete",
    controller: Controller.deleteModule,
    path: "business/:id",
    authorization: true,
    authCheckType: [role.user],
  },
];

export default routes;
