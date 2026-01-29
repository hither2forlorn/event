import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "user",
	},
	{
		method: "post",
		controller: Controller.create,
		path: "user",
	},
	{
		method: "patch",
		controller: Controller.changePassword,
		path: "user",
		authorization: true,
		authCheckType: ["client"]
	},
	{
		method: "delete",
		controller: Controller.deleteModule,
		path: "user/:id",
		authCheckType: ["client"]
	},
	{
		method: "post",
		controller: Controller.login,
		path: "user/login",

	},
];
export default routes;
