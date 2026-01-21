import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "ventures",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "ventures",
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "ventures/:id",
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "ventures/:id",
	},
];
export default routes;

