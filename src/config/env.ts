import dotenv from "dotenv";
dotenv.config();
const env: any = {
	APP_NAME: process.env.APP_NAME,
	MODE: process.env.MODE || "development",
	PORT: process.env.PORT || 9000,
	DATABASE_URL: process.env.DATABASE_URL,
	// API_KEY: process.env.API_KEY,
	JWT_SECRET: process.env.JWT_SECRET || "",
	// REDIS_IP: process.env.REDIS_IP,
	// REDIS_HOST: process.env.REDIS_HOST,
	// REDIS_PORT: process.env.REDIS_PORT,
	// REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
	TIMEZONE: "Asia/Kathmandu",
	SMS_AUTH_TOKEN: process.env.SMS_AUTH_TOKEN,
	MAIL_HOST: process.env.MAIL_HOST,
	MAIL_PORT: process.env.MAIL_PORT,
	MAIL_USER: process.env.MAIL_USER,
	MAIL_PASSWORD: process.env.MAIL_PASS || "",
};

export default env;
