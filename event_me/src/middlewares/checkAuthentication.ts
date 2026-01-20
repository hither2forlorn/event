import Token from "../utils/token";
const checkSpecificRole = async (user: any, allowTo: string[]) => {
	console.log('allow to module ', allowTo);
	if (!allowTo.includes(user?.role)) {
		throw new Error("Unauthorized");
	}
	return user;
};
// const OpsMiddleware= async (ops:any,allowto:string[])=>{

// }
const checkAuthentication = async (request: any, allowTo: string[]) => {
	try {
		const token = request.headers["authorization"];
		if (!token && allowTo.includes("public")) {
		} else {
			const host = request.headers["host"];
			const userAgent = request.headers["user-agent"];
			if (!token) {
				console.log("No token was found in the header");
				throw new Error("Unauthorized: No token was found in the header");
			}
			const tokenWithoutBearer = token.startsWith("Bearer")
				? token.replace(/^Bearer\s+/i, '')
				: token;
			const decoded = await Token.verify(tokenWithoutBearer);
			console.log(decoded);

			if (!decoded) {
				throw new Error("UNAUTHORIZED");
			} else if (decoded?.host !== host) {
				throw new Error("UNAUTHORIZED");
			} else if (decoded?.userAgent !== userAgent) {
				throw new Error("UNAUTHORIZED");
			} else {
				if (!Array.isArray(allowTo) || !allowTo?.length) {
					throw new Error("Unauthorized");
				} else {
					const userId = decoded.id;
					const userRole = decoded.role.trim();
					await checkSpecificRole(decoded, allowTo); // This is done
					if (userRole == "ops") {
						// Check for the route permission to the role
						console.log(`${request.path}This is the path of the user route`);
						const access = checkOpsAccess(request.path, decoded.allowTo);
						if (!access) {
							console.log("Check failed for the user ");
							throw new Error("Unauthorized");
						}
					}
					try {
						console.log("looking for the user with the user is ", userId);
						let user;
						switch (userRole) {
							case "admin":
								// user = await Admin.find(userId);
								if (!1) {
									throw new Error("UNAUTHORIZED : No admin  with this token in the table ");
								}
								break;
							case "retailer":
								// user = await Retailer.find(userId);
								if (!1) {
									throw new Error("UNAUTHORIZED : No retailer with this token in the table ");
								}
								break;
							case "customer":
								// user = await Customer.find(userId);
								if (!true) {
									throw new Error("UNAUTHORIZED : No retailer with this token in the table ");
								}
								break;
							default:
								throw new Error("Unauthorized: Invalid user role");
						}

						request.user = user;
					} catch (err: any) {
						throw new Error(err.message || "Unauthorized");
					}
				}
			}
		}
	} catch (err: any) {
		throw new Error(err.message || "Unauthorized");
	}
};
export const checkOpsAccess = (path: string, decodedInfo: any) => {
	const extracted_module = path.split("/");
	for (const permission in decodedInfo) { // permissions is the index of the module
		if (extracted_module.includes(decodedInfo[permission])) { // Extracted module ==["api","modulename","hello"] .include can be used to iterate over it to check fot the name of the file 
			return true;
		}
	}
	return false; // Fallback case
}
export default checkAuthentication;
