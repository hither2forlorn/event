import Controller from "./controller.js";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "guests",

	},
	{
		method: "get",
		controller: Controller.getByEventId,
		path: "guests/event/:id",
	},
	{
		method: "get",
		controller: Controller.getById,
		path: "guests/:id",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "guests",
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "guests/:id",
	},
]
export default routes;
