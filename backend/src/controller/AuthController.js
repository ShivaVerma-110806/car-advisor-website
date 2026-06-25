
import User from "../models/userSchema.js";
// 2. Fixed spelling of 'bcrypt' package name
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 3. Added 'await' and passed an object query: { email } instead of a raw string
    const existinguser = await User.findOne({ email }); 
    if (existinguser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 4. Fixed spelling from 'bycrpt' to 'bcrypt'
    const hashedpassword = await bcrypt.hash(password, 10); 
    
    // 5. Removed redundant 'await' before User.create since it executes fine directly
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    const token = jwt.sign(
      {
          userId: user._id,
      },
      process.env.JWT_SECRET,
      {
          expiresIn: "7d",
      }
  );


    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        // Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};