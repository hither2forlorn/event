import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import env from "../env";
import logger from "../logger";

export const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 50,
	min: 10,
	idleTimeoutMillis: 60000,
	connectionTimeoutMillis: 5000,
	maxUses: 10000,
	allowExitOnIdle: true,
	keepAlive: true,
	keepAliveInitialDelayMillis: 10000,
	statement_timeout: 30000,
	query_timeout: 60000,
	ssl: {
		rejectUnauthorized: false,
	},
});
pool.on("error", (err: any) => {
	logger.error("❌ Database pool error:", err);
});
pool.on("connect", (_) => {
	logger.info(
		`🔌 New database connection. Total: ${pool.totalCount}, Idle: ${pool.idleCount}`
	);
});

pool.on("acquire", (_) => {
	logger.info(
		`📥 Client acquired. Idle: ${pool.idleCount}, Waiting: ${pool.waitingCount}`
	);
});
const gracefulShutdown = async (signal: string) => {
	logger.info(`\n🔄 Received ${signal}. Starting graceful shutdown...`);
	try {
		await pool.end();
		logger.info("✅ Database connections closed");
		process.exit(0);
	} catch (error) {
		logger.error("❌ Error during database shutdown:%s", error);
		process.exit(1);
	}
};

// Handle shutdown signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

const db = drizzle(pool, {
	schema,
	logger: process.env.MODE === "DEVELOPMENT",

});

export default db;
