import Controller from "./controller";

const routes = [
  {
    method: "get",
    controller: Controller.get,
    path: "event",
  },
  {
    method: "get",
    controller: Controller.findOne,
    path: "event/:id",
  },
  {
    method: "post",
    controller: Controller.create,
    path: "event",
    authorization: true,
    authCheckType: ["admin"]
  },
  {
    method: "patch",
    controller: Controller.update,
    path: "event/:id",
    authorization: true,
    authCheckType: ["admin"]
  },
  {
    method: "delete",
    controller: Controller.deleteModule,
    path: "event/:id",
    authorization: true,
    authCheckType: ["admin"]
  },
  {
    method: "get",
    controller: Controller.getByUser,
    path: "user/event",
    authorization: true,
    authCheckType: ["admin"]
  },
];

export default routes;
