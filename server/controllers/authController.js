import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =====================================================
// REGISTER STUDENT
// =====================================================

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            college,
            branch,
            year,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, Email and Password are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            college: college || "",
            branch: branch || "",
            year: year || "",
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,

                role: user.role,
                location: user.location,
                bio: user.bio,
                availability: user.availability,
                skills: user.skills,

                github: user.github,
                linkedin: user.linkedin,
                portfolio: user.portfolio,

                photo: user.photo,
                resume: user.resume,

                profileCompleted: user.profileCompleted,
            },
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// =====================================================
// LOGIN STUDENT
// =====================================================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,

                role: user.role,
                location: user.location,
                bio: user.bio,
                availability: user.availability,
                skills: user.skills,

                github: user.github,
                linkedin: user.linkedin,
                portfolio: user.portfolio,

                photo: user.photo,
                resume: user.resume,

                profileCompleted: user.profileCompleted,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// =====================================================
// GET LOGGED-IN USER PROFILE
// =====================================================

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            name,
            email,
            college,
            branch,
            year,
            role,
            location,
            bio,
            availability,
            skills,
            github,
            linkedin,
            portfolio,
            photo,
            resume,
        } = req.body;

        // ---------------------------------------------
        // Check if email belongs to another user
        // ---------------------------------------------

        if (email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered by another user",
                });
            }
        }

        // ---------------------------------------------
        // Prepare update data
        // ---------------------------------------------

        const updateData = {
            name,
            email,
            college,
            branch,
            year,
            role,
            location,
            bio,
            availability,
            skills: Array.isArray(skills) ? skills : [],
            github,
            linkedin,
            portfolio,
            photo,
            resume,
            profileCompleted: true,
        };

        // ---------------------------------------------
        // Remove undefined values
        // ---------------------------------------------

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // ---------------------------------------------
        // Update MongoDB
        // ---------------------------------------------

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};