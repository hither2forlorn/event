import { Express, Request, Response, NextFunction } from "express";
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

const createRouteHandler = (controller: Function, path: string) => {
	const handler = async (req: Request | any, res: Response, next: NextFunction) => {
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
			next(err); // Pass error to Express error handler
		}
	};

	return handler;
};

const createAuthMiddleware = (authCheckType?: string[]) => {
	return async (req: Request | any, res: Response, next: NextFunction) => {
		try {
			await checkAuthentication(req, authCheckType as string[]);
			next();
		} catch (err) {
			next(err);
		}
	};
};

const routesInit = async (app: Express) => {
	try {
		routes = await routeLoader.loadAllRoutes();
		for (const route of routes) {
			const { method, path, controller, authorization, authCheckType } =
				route as IRoute | any;
			
			const routeHandler = createRouteHandler(controller, path);
			const apiPath = `/api/${path}`;

			if (authorization) {
				const authMiddleware = createAuthMiddleware(authCheckType);
				app[method as keyof Express](apiPath, authMiddleware, routeHandler);
			} else {
				app[method as keyof Express](apiPath, routeHandler);
			}
		}
	} catch (error) {
		console.error("❌ Failed to initialize routes:", error);
		throw error;
	}
};

export default routesInit;

