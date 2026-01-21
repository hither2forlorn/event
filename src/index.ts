import { pool } from "./config/db";
import server from "./config/server";
import { type Request, type Response } from "express";

import env from "./config/env";
import routeInit from "./routes";
import logger from "./config/logger";
import errorHandler from "./middlewares/errorHandler";

const startServer = async () => {
	try {
		// Connect to database
		const client = await pool.connect();
		client.release();
		logger.info("✅ Database connected");
		// Add error handler

		// Initialize routes
		await routeInit(server);

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

		errorHandler(server);
		// Start server
		server.listen(env.PORT, () => {
			logger.info(`🚀 Server is running at port ${env.PORT}`);
		});
	} catch (err: any) {
		logger.error("❌ Server startup failed:", err);
		process.exit(1);
	}
};

startServer();
