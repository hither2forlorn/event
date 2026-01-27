import Controller from "./controller";

const routes = [
  {
    method: "get",
    controller: Controller.get,
    path: "category",
  },
  {
    method: "get",
    controller: Controller.findOne,
    path: "category/:id",
  },
  {
    method: "post",
    controller: Controller.create,
    path: "category",
    authorization: true,
    authCheckType: ["admin"],
  },
  {
    method: "patch",
    controller: Controller.update,
    path: "category/:id",
    authorization: true,
    authCheckType: ["admin"]
  },
  {
    method: "delete",
    controller: Controller.deleteModule,
    path: "category/:id",
    authorization: true,
    authCheckType: ["admin"]
  },
];

export default routes;
