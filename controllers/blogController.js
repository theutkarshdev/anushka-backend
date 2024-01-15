import Blog from "../model/blogModal.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    if (!title || !description || !date || !coverImage) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const newBlog = new Blog({
      title,
      coverImage,
      description,
      date,
    });

    const savedBlog = await newBlog.save();

    return res.status(201).json({
      message: "Blog created successfully.",
      success: true,
      blog: savedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    const { title, coverImage, description, date } = req.body;

    // Check if any of the fields have changed
    const isChanged =
      (title !== undefined && title !== existingBlog.title) ||
      (coverImage !== undefined && coverImage !== existingBlog.coverImage) ||
      (description !== undefined && description !== existingBlog.description) ||
      (date !== undefined && date !== existingBlog.date);

    if (!isChanged) {
      return res.status(200).json({ message: "Nothing is updated.", success: true });
    }

    // Update the blog fields
    existingBlog.title = title || existingBlog.title;
    existingBlog.coverImage = coverImage || existingBlog.coverImage;
    existingBlog.description = description || existingBlog.description;
    existingBlog.date = date || existingBlog.date;

    const updatedBlog = await existingBlog.save();

    return res.status(200).json({
      message: "Blog updated successfully.",
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    return res.status(200).json({
      message: "Blog deleted successfully.",
      success: true,
      blog: deletedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const allBlogs = await Blog.find();

    return res.status(200).json({
      message: "Blogs retrieved successfully.",
      success: true,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
