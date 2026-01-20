// import bcrypt from "bcryptjs";
// import db from "@/config/db/index"
import logger from "@/config/logger";
export async function seedAdmins() {
	logger.info("Admin seed completed");
}

const seed = async () => {
	await seedAdmins();
	// await seedRetailer();
	// await ops();
}
seed();
export default seed;
