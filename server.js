import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoutes.js";

// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1);
});
db.once("open", () => {
  console.log("Connected to MongoDB");

  app.use("/api/auth", authRoute);
  app.use("/api/blog", blogRoute);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
