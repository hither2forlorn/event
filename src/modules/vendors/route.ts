import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "vendors",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "vendors",
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "vendors/:id",
	},
	{
		method: "delete",
		controller: Controller.get,
		path: "vendors/:id",
	},
];
export default routes;

