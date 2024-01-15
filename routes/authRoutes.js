import express from "express";
const router = express.Router();

import { login, register,verifyUser } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/Validate.js";

router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", authenticateToken, verifyUser);

export default router;
