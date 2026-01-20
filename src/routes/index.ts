import checkAuthentication from "../middlewares/checkAuthentication";
import routeLoader from "./plugin";
export interface IAuthRequest extends Request {
	query: any;
	params: any;
	body: any;
	user: {
		id: number;
		name: string;
		email: string;
		role: string;
	};
}
let routes: any[] = [];
export interface IRoute {
	method: "get" | "post" | "put" | "delete" | "patch";
	path: string;
	controller: (req: Request | IAuthRequest) => Promise<void>;
	authorization?: boolean;
	authCheckType?: string[];
}
//const routeHandlerCache = new Map();
const createRouteHandler = (controller: Function, path: string) => {
	// const cacheKey = `${controller.name}-${path}`;
	// if (routeHandlerCache.has(cacheKey)) {
	// 	return routeHandlerCache.get(cacheKey);
	// }
	const handler = async (req: any, res: any, next: any) => {
		try {
			const startTime = Date.now();
			const data = await controller(req);
			const duration = Date.now() - startTime;
			if (duration > 500) {
				console.warn(`Slow API call: /api/${path} took ${duration}ms`);
			}
			res.json({
				data,
				message: "SUCCESS",
			});
		} catch (err: any) {
			console.error(err);
			next(err);
		}
	};

	// routeHandlerCache.set(cacheKey, handler);
	return handler;
};
const routesInit = async (app: any) => {
	try {
		routes = await routeLoader.loadAllRoutes();
		for (const route of routes) {
			const { method, path, controller, authorization, authCheckType } =
				route as IRoute | any;
			const routeHandler = createRouteHandler(controller, path);

			if (authorization) {
				// Create Express middleware wrapper for authentication
				const authMiddleware = async (req: any, _: any, next: any) => {
					try {
						await checkAuthentication(req, authCheckType || []);
						next();
					} catch (error) {
						next(error);
					}
				};
				app[method](`/api/${path}`, authMiddleware, routeHandler);
			} else {
				app[method](`/api/${path}`, routeHandler);
			}
		}
	} catch (error) {
		console.error("❌ Failed to initialize routes:", error);
		throw error;
	}
};
export default routesInit;
