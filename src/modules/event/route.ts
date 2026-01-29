import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "event",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "event",
		authorization: true,
		authCheckType: ["client"],
	},
	{
		method: "get",
		controller: Controller.listMyEvents,
		path: "event/my-events",
		authorization: true,
		authCheckType: ["client"],
	},
	{
		method: "get",
		controller: Controller.getUserRelatedToEvent,
		path: "event/:eventId/users",
		authorization: true,
		authCheckType: ["client"],
	},
	{
		method: "get",
		controller: Controller.findOne,
		path: "event/:id",
	},
	{
		method: "patch",
		controller: Controller.update,
		path: "event/:id",
		authorization: true,
		authCheckType: ["client"],
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "event/:id",
		authorization: true,
		authCheckType: ["client"],
	},
];

export default routes;
