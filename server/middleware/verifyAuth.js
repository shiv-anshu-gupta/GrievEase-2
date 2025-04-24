import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
