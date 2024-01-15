import User from "../model/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, roleType, email, password, confirmPassword } = req.body;

    // Validate confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords don't match",
      });
    }

    // Verify if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "Email already used",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      fullName,
      email,
      roleType,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User successfully created!",
      result: savedUser,
      success: true,
    });
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    // Generate a JWT token
    const jwtToken = jwt.sign(
      {
        email: user.email,
        userName: user.fullName,
        role: user.roleType,
      },
      process.env.JWT_SECRET, // Replace with your actual JWT secret
      {
        expiresIn: "1h", // Set the expiration time as needed
      },
    );

    return res.status(200).json({
      accessToken: jwtToken,
      user: {
        name: user.fullName,
        role: user.roleType,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyUser = async (req, res) => {
  return res.status(200).json({ message: "Verified Successfully...", success: true });
};
