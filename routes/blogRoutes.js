import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up multer to store images in the public/uploads folder
const storage = multer.diskStorage({
  destination: "./public/uploads/blogs",
  filename: function (req, file, cb) {
    cb(null, "cover_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

import { createBlog, updateBlog, deleteBlog, getAllBlogs } from "../controllers/blogController.js";
import { authenticateToken } from "../middleware/Validate.js";

router.post("/create", authenticateToken, upload.single("coverImage"), createBlog);
router.put("/edit/:id", authenticateToken, upload.single("coverImage"), updateBlog);
router.delete("/delete/:id", authenticateToken, deleteBlog);
router.get("/all-blogs", authenticateToken, getAllBlogs);

export default router;
