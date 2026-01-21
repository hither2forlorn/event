import Token from "../utils/token";
const checkSpecificRole = async (user: any, allowTo: string[]) => {
	if (!allowTo.includes(user?.role)) {
		throw new Error("Unauthorized");
	}
	return user;
};
const checkAuthentication = async (request: any, allowTo: string[]) => {
	try {
		const token = request.headers["authorization"];
		if (!token && allowTo.includes("public")) {
			console.log('This dont include the token but should ve allowed to do things in the module');
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
					await checkSpecificRole(decoded, allowTo); // For the authorization 
					try {
						let user;
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
export default checkAuthentication;
