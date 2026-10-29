import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// =====================================================
// HELPERS
// =====================================================

const normalizeEmail = (email) =>
    typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

const createToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in server .env");
    }

    return jwt.sign(
        {
            id: user._id.toString(),
            accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
            algorithm: "HS256",
        }
    );
};

const getPublicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    accountType: user.accountType || "student",
    accountStatus: user.accountStatus || "active",

    college: user.college || "",
    branch: user.branch || "",
    year: user.year || "",

    organizationName: user.organizationName || "",
    organizationDescription: user.organizationDescription || "",
    website: user.website || "",

    role: user.role || "MERN Developer",
    location: user.location || "",
    bio: user.bio || "",
    availability: user.availability || "Available",
    skills: user.skills || [],

    github: user.github || "",
    linkedin: user.linkedin || "",
    portfolio: user.portfolio || "",

    photo: user.photo || "",
    resume: user.resume || {},
    profileCompleted: Boolean(user.profileCompleted),
});

const rejectInactiveAccount = (user, res) => {
    const status = user.accountStatus || "active";

    if (status === "pending") {
        res.status(403).json({
            success: false,
            requiresApproval: true,
            message:
                "Your stakeholder application is pending admin approval. You can log in after approval.",
        });

        return true;
    }

    if (status === "rejected") {
        res.status(403).json({
            success: false,
            message:
                user.rejectionReason ||
                "Your application was rejected. Please contact the administrator.",
        });

        return true;
    }

    if (status !== "active") {
        res.status(403).json({
            success: false,
            message:
                "Your account is not active. Please contact the administrator.",
        });

        return true;
    }

    return false;
};

const validateRegistration = ({ name, email, password }) => {
    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string"
    ) {
        return "Name, email and password are required.";
    }

    if (name.trim().length > 100) {
        return "Name must be 100 characters or fewer.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))) {
        return "Please enter a valid email address.";
    }

    if (password.length < 8 || password.length > 128) {
        return "Password must be between 8 and 128 characters.";
    }

    return null;
};

// =====================================================
// REGISTER STUDENT
// POST /api/auth/register
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

        // Public student registration cannot create stakeholders
        // or administrators.
        if (
            req.body.accountType &&
            req.body.accountType !== "student"
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Please use the appropriate registration option for your account type.",
            });
        }

        const validationError = validateRegistration({
            name,
            email,
            password,
        });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const normalizedEmail = normalizeEmail(email);

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please log in.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            accountType: "student",
            accountStatus: "active",
            college:
                typeof college === "string" ? college.trim() : "",
            branch:
                typeof branch === "string" ? branch.trim() : "",
            year:
                typeof year === "string" ? year.trim() : "",
        });

        const token = createToken(user);

        return res.status(201).json({
            success: true,
            message: "Student registration successful.",
            token,
            user: getPublicUser(user),
        });
    } catch (error) {
        console.error("Student Registration Error:", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please log in.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Registration failed. Please try again.",
        });
    }
};

// =====================================================
// REGISTER STAKEHOLDER
// POST /api/auth/register-stakeholder
// New stakeholder accounts ALWAYS start as pending.
// =====================================================

export const registerStakeholder = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            organizationName,
            organizationDescription,
            website,
        } = req.body;

        const validationError = validateRegistration({
            name,
            email,
            password,
        });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        if (
            typeof organizationName !== "string" ||
            !organizationName.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Organization name is required.",
            });
        }

        if (organizationName.trim().length > 150) {
            return res.status(400).json({
                success: false,
                message:
                    "Organization name must be 150 characters or fewer.",
            });
        }

        if (
            organizationDescription !== undefined &&
            typeof organizationDescription !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Organization description must be text.",
            });
        }

        if (
            typeof organizationDescription === "string" &&
            organizationDescription.length > 2000
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Organization description must be 2000 characters or fewer.",
            });
        }

        if (
            website !== undefined &&
            website !== "" &&
            typeof website !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Website must be a valid URL.",
            });
        }

        let normalizedWebsite = "";

        if (typeof website === "string" && website.trim()) {
            try {
                const parsedWebsite = new URL(website.trim());

                if (
                    !["http:", "https:"].includes(parsedWebsite.protocol)
                ) {
                    throw new Error("Invalid protocol");
                }

                normalizedWebsite = parsedWebsite.toString();
            } catch {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please enter a valid website URL starting with https:// or http://.",
                });
            }
        }

        const normalizedEmail = normalizeEmail(email);

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please log in.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Do not take accountType or accountStatus from the client.
        // Every public stakeholder application must start pending.
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            accountType: "stakeholder",
            accountStatus: "pending",
            organizationName: organizationName.trim(),
            organizationDescription:
                typeof organizationDescription === "string"
                    ? organizationDescription.trim()
                    : "",
            website: normalizedWebsite,
        });

        // Do not issue a token or log in a pending stakeholder.
        return res.status(201).json({
            success: true,
            requiresApproval: true,
            message:
                "Your stakeholder application has been submitted successfully. You can log in after an administrator approves your account.",
            application: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                accountStatus: user.accountStatus,
                organizationName: user.organizationName,
            },
        });
    } catch (error) {
        console.error("Stakeholder Registration Error:", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please log in.",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Stakeholder registration failed. Please try again.",
        });
    }
};

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = normalizeEmail(email);

        if (
            !normalizedEmail ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+password");

        // Temporary diagnostic logs; never log passwords or hashes.
        console.log("[LOGIN DEBUG]", {
            emailProvided: Boolean(normalizedEmail),
            userFound: Boolean(user),
            accountType: user?.accountType ?? null,
            accountStatus: user?.accountStatus ?? null,
            passwordHashPresent: Boolean(user?.password),
            passwordHashLooksBcrypt:
                typeof user?.password === "string" &&
                /^\$2[aby]\$\d{2}\$/.test(user.password),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        if (!user.password) {
            return res.status(401).json({
                success: false,
                message:
                    "This account has no password configured. Please use the appropriate account recovery option.",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("[LOGIN DEBUG] Password matched:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        if (rejectInactiveAccount(user, res)) {
            return;
        }

        if (!["student", "stakeholder"].includes(user.accountType)) {
            return res.status(403).json({
                success: false,
                message: "Account type is invalid. Please contact support.",
            });
        }

        const token = createToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: getPublicUser(user),
        });
    } catch (error) {
        console.error("Login Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
};


// =====================================================
// GOOGLE LOGIN — EXISTING ACCOUNTS ONLY
// POST /api/auth/google
// =====================================================

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (
            typeof credential !== "string" ||
            !credential
        ) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required.",
            });
        }

        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.status(500).json({
                success: false,
                message: "Google login is not configured.",
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (
            !payload ||
            !payload.email ||
            !payload.email_verified
        ) {
            return res.status(401).json({
                success: false,
                message: "Google email could not be verified.",
            });
        }

        const email = normalizeEmail(payload.email);

        // Google login never creates new accounts.
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({
                success: false,
                requiresRegistration: true,
                message:
                    "No account found. Please register first.",
            });
        }

        if (rejectInactiveAccount(user, res)) {
            return;
        }

        if (
            !["student", "stakeholder"].includes(user.accountType)
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Account type is invalid. Please contact support.",
            });
        }

        if (payload.picture && !user.photo) {
            user.photo = payload.picture;
            await user.save();
        }

        const token = createToken(user);

        return res.status(200).json({
            success: true,
            message: "Google login successful.",
            token,
            user: getPublicUser(user),
        });
    } catch (error) {
        console.error("Google Login Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Google login failed. Please try again.",
        });
    }
};

// =====================================================
// GET LOGGED-IN USER PROFILE
// GET /api/auth/profile
// =====================================================

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Also prevent suspended/rejected users from using an old token.
        if (rejectInactiveAccount(user, res)) {
            return;
        }

        return res.status(200).json({
            success: true,
            user: getPublicUser(user),
        });
    } catch (error) {
        console.error("Get Profile Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch profile.",
        });
    }
};

// =====================================================
// UPDATE PROFILE
// PUT /api/auth/profile
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
            organizationName,
            organizationDescription,
            website,
        } = req.body;

        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (rejectInactiveAccount(currentUser, res)) {
            return;
        }

        const updateData = {};

        const allowedFields = {
            name,
            email,
            college,
            branch,
            year,
            role,
            location,
            bio,
            availability,
            github,
            linkedin,
            portfolio,
            photo,
            resume,
        };

        for (const [key, value] of Object.entries(allowedFields)) {
            if (value !== undefined) {
                updateData[key] = value;
            }
        }

        // Only stakeholder users may update their organization details.
        // Account type/status are never editable here.
        if (currentUser.accountType === "stakeholder") {
            if (organizationName !== undefined) {
                if (
                    typeof organizationName !== "string" ||
                    !organizationName.trim() ||
                    organizationName.trim().length > 150
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Please enter a valid organization name.",
                    });
                }

                updateData.organizationName = organizationName.trim();
            }

            if (organizationDescription !== undefined) {
                if (
                    typeof organizationDescription !== "string" ||
                    organizationDescription.length > 2000
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Organization description must be text of at most 2000 characters.",
                    });
                }

                updateData.organizationDescription =
                    organizationDescription.trim();
            }

            if (website !== undefined) {
                if (typeof website !== "string") {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid website URL.",
                    });
                }

                if (website.trim()) {
                    try {
                        const parsedWebsite = new URL(website.trim());

                        if (
                            !["http:", "https:"].includes(
                                parsedWebsite.protocol
                            )
                        ) {
                            throw new Error("Invalid protocol");
                        }

                        updateData.website = parsedWebsite.toString();
                    } catch {
                        return res.status(400).json({
                            success: false,
                            message: "Please enter a valid website URL.",
                        });
                    }
                } else {
                    updateData.website = "";
                }
            }
        }

        if (updateData.name !== undefined) {
            if (
                typeof updateData.name !== "string" ||
                !updateData.name.trim() ||
                updateData.name.trim().length > 100
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid name.",
                });
            }

            updateData.name = updateData.name.trim();
        }

        if (updateData.email !== undefined) {
            if (typeof updateData.email !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email.",
                });
            }

            updateData.email = normalizeEmail(updateData.email);

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid email.",
                });
            }

            const existingUser = await User.findOne({
                email: updateData.email,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already used by another account.",
                });
            }
        }

        if (updateData.skills !== undefined) {
            if (!Array.isArray(updateData.skills)) {
                return res.status(400).json({
                    success: false,
                    message: "Skills must be a list.",
                });
            }

            updateData.skills = updateData.skills
                .filter((skill) => typeof skill === "string")
                .map((skill) => skill.trim())
                .filter(Boolean);
        }

        if (updateData.availability !== undefined) {
            const allowedAvailability = [
                "Available",
                "Looking for Team",
                "Busy",
            ];

            if (
                !allowedAvailability.includes(updateData.availability)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid availability value.",
                });
            }
        }

        updateData.profileCompleted = true;

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
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: getPublicUser(updatedUser),
        });
    } catch (error) {
        console.error("Update Profile Error:", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already used by another account.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update profile.",
        });
    }
};

