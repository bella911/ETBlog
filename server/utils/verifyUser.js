import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
// 	const token = req.cookies.token;
// 	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

// 		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

// 		req.user = decoded; // if we added decoded.userId ... the req.user only have user if... else we send all decoded user info
// 		next();
// 	} catch (error) {
// 		console.log("Error in verifyToken ", error);
// 		return res.status(500).json({ success: false, message: "Server error" });
// 	}
// };

// Middleware to authenticate JWT from Chat GPT
export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	// Get the token from the request header (typically 'Authorization')
	// const token = req.header("Authorization")?.replace("Bearer ", "");
if (token) {
	  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) {
		  return res.status(403); // Forbidden
		}
		req.user = user;
		next();
	  });
	} else {
		return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
	}
  };