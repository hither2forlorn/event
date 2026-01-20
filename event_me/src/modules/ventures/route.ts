import { roles } from "@/constant";
import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "admin",
		authorization: true,
		authCheckType: [roles.ADMIN]
	},
	{
		method: "post",
		controller: Controller.create,
		path: "admin",
		authorization: true,
		authCheckType: [roles.ADMIN]
	},
	{
		method: "post",
		controller: Controller.update_retailer,
		path: "admin/update_retailer",
		authorization: true,
		authCheckType: [roles.ADMIN, roles.OPS] // Ops with the admin information 
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "admin/:id",
		authorization: true,
		authCheckType: [roles.ADMIN],
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "admin/:id",
		authorization: true,
		authCheckType: [roles.ADMIN],
	},
	{
		method: "post",
		controller: Controller.update_retailer,
		path: "admin/verify-retailer/:id",
		authorization: true,
		authCheckType: [roles.ADMIN, roles.RETAILER]
	},
	{
		method: "post",
		controller: Controller.login,
		path: "admin/login",
	}
];
export default routes;

