import { IRoute } from "@/routes";
import Controller from "./controller";
import { validate } from "@/middlewares/zodValidation";
import {
  addMemberValidation,
  createFamilyValidation,
  familyAndMemberIdParamValidation,
  familyIdParamValidation,
  updateFamilyValidation,
  updateMemberValidation,
} from "./validators";
const routes: IRoute[] = [
  {
    method: "post",
    controller: Controller.create,
    path: "family",
    authorization: true,
    validation: validate(createFamilyValidation),
  },
  {
    method: "get",
    controller: Controller.getMyFamilies,
    path: "family",
    authorization: true,
  },
  {
    method: "patch",
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
    validation: validate(familyIdParamValidation),
  },
  {
    method: "get",
    controller: Controller.get,
    path: "family/:id",
    validation: validate(familyIdParamValidation),
  },
  {
    method: "post",
    controller: Controller.addMember,
    path: "family/:id/member",
    authorization: true,
    validation: validate(addMemberValidation),
  },
  {
    method: "get",
    controller: Controller.getMembers,
    path: "family/:id/member",
    authorization: true,
    validation: validate(familyIdParamValidation),
  },
  {
    method: "get",
    controller: Controller.getMemberDetails,
    path: "family/:id/member/:memberId",
    authorization: true,
    validation: validate(familyAndMemberIdParamValidation),
  },
  {
    method: "patch",
    controller: Controller.updateMember,
    path: "family/:id/member/:memberId",
    authorization: true,
    validation: validate(updateMemberValidation),
  },
  {
    method: "delete",
    controller: Controller.deleteMember,
    path: "family/:id/member/:memberId",
    authorization: true,
    validation: validate(familyAndMemberIdParamValidation),
  },
];
export default routes;
