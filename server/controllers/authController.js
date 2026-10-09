import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

import { sendOTPEmail } from "../utils/sendEmail.js";

// ======================================================
// GOOGLE CLIENT
// ======================================================

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// ======================================================
// HELPER
// ======================================================

const createRandomPasswordHash = async () => {
    const randomPassword = crypto
        .randomBytes(32)
        .toString("hex");

    return await bcrypt.hash(
        randomPassword,
        10
    );
};

const ensureUserPassword = async (user) => {
    if (!user.password) {
        user.password =
            await createRandomPasswordHash();

        return true;
    }

    return false;
};

// ======================================================
// REGISTER
// ======================================================

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword,
            accountType,
            college,
            branch,
            year,
            organizationName,
            organizationType,
            organizationDescription,
            website,
            stakeholderRole,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required.",
            });
        }

        const normalizedAccountType =
            accountType === "stakeholder"
                ? "stakeholder"
                : "student";

        if (
            confirmPassword !== undefined &&
            password !== confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Passwords do not match.",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const existingUser =
            await User.findOne({
                email: normalizedEmail,
            });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:
                    "An account with this email already exists.",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,

            accountType:
                normalizedAccountType,

            college:
                normalizedAccountType === "student"
                    ? college || ""
                    : "",

            branch:
                normalizedAccountType === "student"
                    ? branch || ""
                    : "",

            year:
                normalizedAccountType === "student"
                    ? year || ""
                    : "",

            organizationName:
                normalizedAccountType === "stakeholder"
                    ? organizationName || ""
                    : "",

            organizationType:
                normalizedAccountType === "stakeholder"
                    ? organizationType || ""
                    : "",

            organizationDescription:
                normalizedAccountType === "stakeholder"
                    ? organizationDescription || ""
                    : "",

            website:
                normalizedAccountType === "stakeholder"
                    ? website || ""
                    : "",

            stakeholderRole:
                normalizedAccountType === "stakeholder"
                    ? stakeholderRole || ""
                    : "",
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                accountType:
                    user.accountType,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(201).json({
            success: true,
            message:
                "Registration successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType:
                    user.accountType,

                college: user.college,
                branch: user.branch,
                year: user.year,

                organizationName:
                    user.organizationName,

                organizationType:
                    user.organizationType,

                organizationDescription:
                    user.organizationDescription,

                website:
                    user.website,

                stakeholderRole:
                    user.stakeholderRole,

                profileCompleted:
                    user.profileCompleted,
            },
        });
    } catch (error) {
        console.error(
            "Register Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Registration failed.",
        });
    }
};

// ======================================================
// LOGIN
// ======================================================

export const login = async (req, res) => {
    try {
        const {
            email,
            password,
            accountType,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required.",
            });
        }

        const normalizedAccountType =
            accountType === "stakeholder"
                ? "stakeholder"
                : "student";

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await User.findOne({
                email: normalizedEmail,
            });

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        const storedAccountType =
            user.accountType ||
            "student";

        if (
            storedAccountType !==
            normalizedAccountType
        ) {
            return res.status(403).json({
                success: false,
                message:
                    `This account is registered as ${storedAccountType ===
                        "stakeholder"
                        ? "Stakeholder"
                        : "Student"
                    }. Please select the correct account type.`,
            });
        }

        if (!user.password) {
            return res.status(401).json({
                success: false,
                message:
                    "This account was created using Google. Please use Google Login or reset your password.",
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                accountType:
                    storedAccountType,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Login successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType:
                    storedAccountType,

                college: user.college,
                branch: user.branch,
                year: user.year,

                organizationName:
                    user.organizationName,

                organizationType:
                    user.organizationType,

                organizationDescription:
                    user.organizationDescription,

                website:
                    user.website,

                stakeholderRole:
                    user.stakeholderRole,

                profileCompleted:
                    user.profileCompleted,
            },
        });
    } catch (error) {
        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Login failed.",
        });
    }
};

// ======================================================
// GOOGLE LOGIN
// ======================================================

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message:
                    "Google credential is required.",
            });
        }

        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.status(500).json({
                success: false,
                message:
                    "Google Client ID is not configured.",
            });
        }

        const ticket =
            await googleClient.verifyIdToken({
                idToken: credential,
                audience:
                    process.env.GOOGLE_CLIENT_ID,
            });

        const payload =
            ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid Google credential.",
            });
        }

        const {
            email,
            name,
            picture,
        } = payload;

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Google account email not available.",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        let user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            const hashedPassword =
                await createRandomPasswordHash();

            user = await User.create({
                name:
                    name ||
                    "CONEXA User",

                email:
                    normalizedEmail,

                password:
                    hashedPassword,

                accountType:
                    "student",

                college: "",
                branch: "",
                year: "",
            });
        } else {
            const passwordFixed =
                await ensureUserPassword(user);

            if (passwordFixed) {
                await user.save();
            }
        }

        const storedAccountType =
            user.accountType ||
            "student";

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                accountType:
                    storedAccountType,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Google login successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType:
                    storedAccountType,

                college: user.college,
                branch: user.branch,
                year: user.year,

                organizationName:
                    user.organizationName,

                organizationType:
                    user.organizationType,

                organizationDescription:
                    user.organizationDescription,

                website:
                    user.website,

                stakeholderRole:
                    user.stakeholderRole,

                picture:
                    picture || "",
            },
        });
    } catch (error) {
        console.error(
            "Google Login Error:",
            error
        );

        return res.status(401).json({
            success: false,
            message:
                "Google authentication failed.",
        });
    }
};

// ======================================================
// GET PROFILE
// ======================================================

export const getProfile = async (req, res) => {
    try {
        const userId =
            req.user?.id ||
            req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication required.",
            });
        }

        const user =
            await User.findById(
                userId
            ).select(
                "-password -resetOtpHash"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(
            "Get Profile Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch profile.",
        });
    }
};

// ======================================================
// UPDATE PROFILE
// ======================================================

export const updateProfile = async (
    req,
    res
) => {
    try {
        const userId =
            req.user?.id ||
            req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication required.",
            });
        }

        // IMPORTANT:
        // Use findByIdAndUpdate directly so invalid
        // resume/photo objects already stored on an
        // old user document are not cast during save.
        const allowedFields = [
            "name",
            "college",
            "branch",
            "year",
            "role",
            "location",
            "bio",
            "availability",
            "skills",
            "github",
            "linkedin",
            "portfolio",
            "organizationName",
            "organizationType",
            "organizationDescription",
            "website",
            "organizationLogo",
            "stakeholderRole",
            "profileCompleted",
        ];

        const updateData = {};

        allowedFields.forEach(
            (field) => {
                if (
                    req.body[field] !==
                    undefined
                ) {
                    updateData[field] =
                        req.body[field];
                }
            }
        );

        // Never update email/password/resume/photo
        // from stakeholder profile form.

        const updatedUser =
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: updateData,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).select(
                "-password -resetOtpHash"
            );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.error(
            "Update Profile Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to update profile.",
        });
    }
};

// ======================================================
// FORGOT PASSWORD - SEND OTP
// ======================================================

export const forgotPassword = async (
    req,
    res
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Email is required.",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await User.findOne({
                email: normalizedEmail,
            });

        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If this email is registered, an OTP has been sent.",
            });
        }

        await ensureUserPassword(user);

        const otp =
            crypto
                .randomInt(
                    100000,
                    1000000
                )
                .toString();

        const otpHash =
            await bcrypt.hash(
                otp,
                10
            );

        user.resetOtpHash =
            otpHash;

        user.resetOtpExpires =
            new Date(
                Date.now() +
                10 * 60 * 1000
            );

        await user.save();

        await sendOTPEmail(
            normalizedEmail,
            otp
        );

        return res.status(200).json({
            success: true,
            message:
                "If this email is registered, an OTP has been sent.",
        });
    } catch (error) {
        console.error(
            "Forgot Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to process password reset request.",
        });
    }
};

// ======================================================
// VERIFY OTP
// ======================================================

export const verifyOtp = async (
    req,
    res
) => {
    try {
        const {
            email,
            otp,
        } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and OTP are required.",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await User.findOne({
                email: normalizedEmail,
            });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        if (
            !user.resetOtpHash ||
            !user.resetOtpExpires
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "OTP is invalid or has expired.",
            });
        }

        if (
            new Date() >
            new Date(
                user.resetOtpExpires
            )
        ) {
            user.resetOtpHash = "";
            user.resetOtpExpires =
                null;

            await ensureUserPassword(
                user
            );

            await user.save();

            return res.status(400).json({
                success: false,
                message:
                    "OTP has expired. Please request a new OTP.",
            });
        }

        const otpMatch =
            await bcrypt.compare(
                otp.toString(),
                user.resetOtpHash
            );

        if (!otpMatch) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid OTP.",
            });
        }

        const resetToken =
            jwt.sign(
                {
                    id: user._id,
                    purpose:
                        "password-reset",
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "10m",
                }
            );

        user.resetOtpHash = "";
        user.resetOtpExpires =
            null;

        await ensureUserPassword(
            user
        );

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "OTP verified successfully.",
            resetToken,
        });
    } catch (error) {
        console.error(
            "Verify OTP Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to verify OTP.",
        });
    }
};

// ======================================================
// RESEND OTP
// ======================================================

export const resendOtp = async (
    req,
    res
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Email is required.",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await User.findOne({
                email: normalizedEmail,
            });

        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If this email is registered, an OTP has been sent.",
            });
        }

        await ensureUserPassword(user);

        const otp =
            crypto
                .randomInt(
                    100000,
                    1000000
                )
                .toString();

        const otpHash =
            await bcrypt.hash(
                otp,
                10
            );

        user.resetOtpHash =
            otpHash;

        user.resetOtpExpires =
            new Date(
                Date.now() +
                10 * 60 * 1000
            );

        await user.save();

        await sendOTPEmail(
            normalizedEmail,
            otp
        );

        return res.status(200).json({
            success: true,
            message:
                "If this email is registered, an OTP has been sent.",
        });
    } catch (error) {
        console.error(
            "Resend OTP Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to resend OTP.",
        });
    }
};

// ======================================================
// RESET PASSWORD
// ======================================================

export const resetPassword = async (
    req,
    res
) => {
    try {
        const {
            resetToken,
            password,
            confirmPassword,
        } = req.body;

        if (!resetToken || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Reset token and password are required.",
            });
        }

        if (
            confirmPassword !== undefined &&
            password !==
            confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Passwords do not match.",
            });
        }

        let decoded;

        try {
            decoded =
                jwt.verify(
                    resetToken,
                    process.env.JWT_SECRET
                );
        } catch (error) {
            return res.status(401).json({
                success: false,
                message:
                    "Reset session has expired. Please request a new OTP.",
            });
        }

        if (
            decoded.purpose !==
            "password-reset"
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid password reset token.",
            });
        }

        const user =
            await User.findById(
                decoded.id
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found.",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        user.password =
            hashedPassword;

        user.resetOtpHash = "";
        user.resetOtpExpires =
            null;

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully.",
        });
    } catch (error) {
        console.error(
            "Reset Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to reset password.",
        });
    }
};