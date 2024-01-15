import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (!decodedToken || !decodedToken.role) {
      return res.status(403).json({ message: "Forbidden: User role not found in token" });
    }

    if (decodedToken.role === "admin") {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "Forbidden: Insufficient role permissions" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
