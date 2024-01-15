import express from "express";

const router = express.Router();

import { createBooking, getAllBookings } from "../controllers/bookingController.js";
import { authenticateToken } from "../middleware/Validate.js";

router.post("/create", createBooking);
router.get("/all-bookings", getAllBookings);

export default router;
