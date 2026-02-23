import Controller from "./controller";
const routes = [
  {
    method: "post",
    controller: Controller.create,
    path: "family",
  },
  {
    method: "put",
    controller: Controller.update,
    path: "family/:id",
  },
  {
    method: "delete",
    controller: Controller.deleteFamily,
    path: "family/:id",
  },
  {
    method: "get",
    controller: Controller.get,
    path: "family/:id",
  },
];
export default routes;
