import express, { type Express, type Request, type Response, type NextFunction } from "express";
import logger from "./logger";
import corsOptions from "./cors";
import helmetOptions from "./helmet";

const server: Express = express();

// Security middleware
server.use(helmetOptions);

// Middleware for body parsing
server.use(express.json({ limit: "100mb" }));
server.use(express.urlencoded({ limit: "100mb", extended: true }));

// CORS middleware
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

// 404 handler for /api routes
server.use("/api", (req: Request, res: Response) => {
	logger.warn(`❌ API route not found: ${req.path}`);
	res.status(404).json({
		success: false,
		error: "Not Found",
		message: `Api:${req.path} not found`
	});
});

// 404 handler for all other routes (catch-all)
server.use((req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		error: "Not Found",
		message: `Route ${req.path} not found`
	});
});

export default server;
