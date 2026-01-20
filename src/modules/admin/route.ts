import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "admin",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.create,
		path: "admin",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.update_retailer,
		path: "admin/update_retailer",
		authorization: true,
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "admin/:id",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "admin/:id",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.update_retailer,
		path: "admin/verify-retailer/:id",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.login,
		path: "admin/login",
	}
];
export default routes;

