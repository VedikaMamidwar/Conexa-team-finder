import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// =====================================================
// GOOGLE CLIENT
// =====================================================

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

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

        return res.status(201).json({
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

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// =====================================================
// LOGIN STUDENT
// =====================================================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

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

        return res.status(200).json({
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

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// =====================================================
// GOOGLE LOGIN
// =====================================================

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        // ---------------------------------------------
        // Check Google credential
        // ---------------------------------------------

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required",
            });
        }

        // ---------------------------------------------
        // Verify Google credential
        // ---------------------------------------------

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).json({
                success: false,
                message: "Invalid Google credential",
            });
        }

        // ---------------------------------------------
        // Get Google user information
        // ---------------------------------------------

        const {
            sub: googleId,
            email,
            name,
            picture,
            email_verified,
        } = payload;

        // ---------------------------------------------
        // Verify Google email
        // ---------------------------------------------

        if (!email || !email_verified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified",
            });
        }

        // ---------------------------------------------
        // Find existing Conexa user
        // ---------------------------------------------

        let user = await User.findOne({ email });

        // ---------------------------------------------
        // Create new user if not found
        // ---------------------------------------------

        if (!user) {
            const randomPassword = await bcrypt.hash(
                `google_${googleId}_${Date.now()}`,
                10
            );

            user = await User.create({
                name: name || "Google User",
                email,
                password: randomPassword,

                photo: picture || "",

                college: "",
                branch: "",
                year: "",

                profileCompleted: false,
            });
        }

        // ---------------------------------------------
        // Update Google profile picture
        // ---------------------------------------------

        else if (picture && !user.photo) {
            user.photo = picture;
            await user.save();
        }

        // ---------------------------------------------
        // Create Conexa JWT
        // ---------------------------------------------

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ---------------------------------------------
        // Send response
        // ---------------------------------------------

        return res.status(200).json({
            success: true,
            message: "Google Login Successful",
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
        console.error("Google Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Google login failed",
            error: error.message,
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

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
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
        // Check duplicate email
        // ---------------------------------------------

        if (email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email already registered by another user",
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

            skills: Array.isArray(skills)
                ? skills
                : [],

            github,
            linkedin,
            portfolio,
            photo,
            resume,

            profileCompleted: true,
        };

        // Remove undefined values
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // ---------------------------------------------
        // Update user
        // ---------------------------------------------

        const updatedUser =
            await User.findByIdAndUpdate(
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

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};