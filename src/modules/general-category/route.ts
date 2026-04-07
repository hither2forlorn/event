import { validate } from "@/middlewares/zodValidation";
import Controller from "./controller";
import {
  generalCategoryUpdateValidationSchema,
  generalCategoryValidationSchema,
} from "./validators";

const routes = [
  {
    method: "get",
    controller: Controller.get,
    path: "general-category",
    authorization: false,
  },
  {
    method: "post",
    controller: Controller.create,
    path: "general-category",
    authorization: false,
    validation: validate(generalCategoryValidationSchema),
  },
  {
    method: "get",
    controller: Controller.findOne,
    path: "general-category/:id",
    authorization: false,
  },
  {
    method: "patch",
    controller: Controller.update,
    path: "general-category/:id",
    authorization: false,
    validation: validate(generalCategoryUpdateValidationSchema),
  },
  {
    method: "delete",
    controller: Controller.deleteCategory,
    path: "general-category/:id",
    authorization: false,
  },
];

export default routes;
