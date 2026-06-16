import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    console.log("STEP 1 - Authorization header:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("STEP 2 - Extracted token:", token);

    if (!token) {
      return res.status(401).json({
        Unauthorized: "You are not authorized to access this resource"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("STEP 3 - Decoded token:", decoded);

    const user = await User.findById(decoded.userId);
    console.log("STEP 4 - User from DB:", user);

    if (!user) {
      return res.status(401).json({
        Unauthorized: "User not found"
      });
    }

    req.user = user;

    return next();   

  } catch (error) {
    return res.status(401).json({
      Unauthorized: "Invalid or expired token"
    });
  }
};

export default authorize;