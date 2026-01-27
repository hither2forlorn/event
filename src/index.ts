import { pool } from "./config/db";
import server from "./config/server";
import { type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";

import env from "./config/env";
import routeInit from "./routes/index";
import logger from "./config/logger";
import errorHandler from "./middlewares/errorHandler";
import swaggerSpec from "./config/swagger";

const startServer = async () => {
  try {
    // Connect to database
    const client = await pool.connect();
    client.release();
    logger.info("✅ Database connected");

    // Swagger UI
    server.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Event Management API Docs",
      }),
    );
    logger.info("📚 Swagger UI available at /api-docs");

    // Initialize routes
    await routeInit(server);

    // 404 handler for /api routes
    server.use("/api", (req: Request, res: Response) => {
      logger.warn(`❌ API route not found: ${req.path}`);
      res.status(404).json({
        success: false,
        error: "Not Found",
        message: `Api:${req.path} not found`,
      });
    });

    // 404 handler for all other routes (catch-all)
    server.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: "Not Found",
        message: `Route ${req.path} not found`,
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
