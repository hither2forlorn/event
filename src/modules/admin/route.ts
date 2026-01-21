import Controller from "./controller";
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
];
export default routes;

