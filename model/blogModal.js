import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;
