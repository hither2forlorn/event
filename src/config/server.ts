import express, { type Express, type Request, type Response, type NextFunction } from "express";
import logger from "./logger";
import corsOptions from "./cors";
import helmetOptions from "./helmet";

const server: Express = express();
server.use(helmetOptions);
server.use(express.json({ limit: "100mb" }));
server.use(express.urlencoded({ limit: "100mb", extended: true }));
server.use(corsOptions);

// Request logging middleware
server.use((req: Request, _: Response, next: NextFunction) => {
	logger.debug(`Incoming request: ${req.method} ${req.path}`);
	next();
});

// Root health check endpoint
server.get("/", (_: Request, res: Response) => {
	console.log('This is the server responce ');
	res.send("server is running");
});

// Root POST health check endpoint
server.post("/", (req: Request, res: Response) => {
	logger.debug(`the post request is ${JSON.stringify(req.body)}`);
	res.send("server is healthy");
});

export default server;
