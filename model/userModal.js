import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true, // Trim leading and trailing whitespaces
  },
  email: {
    type: String,
    trim: true,
    lowercase: true, // Convert email to lowercase
    match: /^\S+@\S+\.\S+$/, // Simple email format validation
  },
  roleType: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
