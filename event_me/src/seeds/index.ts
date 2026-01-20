import bcrypt from "bcryptjs";
import db from "@/config/db/index"
import adminSchema from "@/modules/admin/schema";
import logger from "@/config/logger";
import seedRetailer from "./retailer";
import ops from "./ops"
export async function seedAdmins() {
	console.log('This is adding the admin')
	const seed = [
		{
			name: "Super Admin",
			username: "superadmin",
			email: "admin@example.com",
			password: bcrypt.hashSync("admin@123", 10),
			avatar: null,
			deviceTokens: [],
			infos: { permissions: ["admin"] },
		},
	];
	await db.insert(adminSchema).values(seed).onConflictDoNothing();
	logger.info("Admin seed completed");
}

const seed = async () => {
	await seedAdmins();
	await seedRetailer();
	await ops();
}
seed();
export default seed;
