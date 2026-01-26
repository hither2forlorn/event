import Controller from "./controller.js";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "admin",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "admin",
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "admin/:id",
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "admin/:id",
	},
	{
		method: "post",
		controller: Controller.login,
		path: "admin/login",
	},
];
export default routes;
