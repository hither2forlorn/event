import { IRoute } from "@/routes";
import Controller from "./controller";
import { validate } from "@/middlewares/zodValidation";
import { createFamilyValidation, updateFamilyValidation } from "./validators";
const routes: IRoute[] = [
  {
    method: "post",
    controller: Controller.create,
    path: "family",
    authorization: true,
    validation: validate(createFamilyValidation),
  },
  {
    method: "put",
    controller: Controller.update,
    path: "family/:id",
    authorization: true,
    validation: validate(updateFamilyValidation),
  },
  {
    method: "delete",
    controller: Controller.deleteFamily,
    path: "family/:id",
    authorization: true,
  },
  {
    method: "get",
    controller: Controller.get,
    path: "family/:id",
  },
];
export default routes;
