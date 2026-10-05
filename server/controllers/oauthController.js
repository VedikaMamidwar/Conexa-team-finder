import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* =========================================================
   HELPER: CREATE JWT
========================================================= */

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


/* =========================================================
   HELPER: FORMAT USER
========================================================= */

const formatUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,

        organizationName: user.organizationName || "",
        organizationDescription: user.organizationDescription || "",
        website: user.website || "",

        college: user.college || "",
        branch: user.branch || "",
        year: user.year || "",

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

        profileCompleted: user.profileCompleted || false,

        authProvider: user.authProvider || "local",
    };
};


/* =========================================================
   GOOGLE LOGIN
========================================================= */

export const googleLogin = async (req, res) => {
    try {
        const { credential, accountType } = req.body;

        console.log("========== GOOGLE LOGIN ==========");

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required",
            });
        }

        if (!accountType) {
            return res.status(400).json({
                success: false,
                message: "Account type is required",
            });
        }

        if (!["student", "stakeholder"].includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type",
            });
        }

        /* -------------------------------------------------
           IMPORTANT:
           Create OAuth2Client INSIDE the function.
           Do NOT create it at the top of this file.
        ------------------------------------------------- */

        const googleClientId = process.env.GOOGLE_CLIENT_ID;

        console.log(
            "SERVER GOOGLE CLIENT ID:",
            googleClientId
        );

        if (!googleClientId) {
            return res.status(500).json({
                success: false,
                message: "GOOGLE_CLIENT_ID is missing in server .env",
            });
        }

        const googleClient = new OAuth2Client(
            googleClientId
        );

        /* -------------------------------------------------
           VERIFY GOOGLE ID TOKEN
        ------------------------------------------------- */

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        });

        const payload = ticket.getPayload();

        console.log(
            "GOOGLE TOKEN AUDIENCE:",
            payload?.aud
        );

        console.log(
            "GOOGLE EMAIL:",
            payload?.email
        );

        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "Invalid Google credential",
            });
        }

        const {
            sub: googleId,
            email,
            name,
            picture,
            email_verified,
        } = payload;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Google account email not available",
            });
        }

        if (!email_verified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified",
            });
        }

        /* -------------------------------------------------
           FIND EXISTING USER
        ------------------------------------------------- */

        let user = await User.findOne({
            email: email.toLowerCase(),
        });

        /* -------------------------------------------------
           EXISTING USER
        ------------------------------------------------- */

        if (user) {
            console.log("Existing user found:", user.email);

            /* Account type must match */
            if (user.accountType !== accountType) {
                return res.status(403).json({
                    success: false,
                    message: `This account is registered as ${user.accountType}. Please select ${user.accountType} when logging in.`,
                });
            }

            /* Update Google information */

            user.authProvider = "google";
            user.providerId = googleId;

            if (!user.photo && picture) {
                user.photo = picture;
            }

            await user.save();
        }

        /* -------------------------------------------------
           NEW USER
        ------------------------------------------------- */

        else {
            console.log("Creating new Google user:", email);

            user = await User.create({
                name: name || "Google User",

                email: email.toLowerCase(),

                // OAuth users don't need a password
                password: "",

                accountType,

                authProvider: "google",

                providerId: googleId,

                photo: picture || "",

                profileCompleted: false,

                organizationName:
                    accountType === "stakeholder"
                        ? ""
                        : "",

                organizationDescription: "",

                website: "",

                college: "",

                branch: "",

                year: "",

                role: "MERN Developer",

                location: "",

                bio: "",

                availability: "Available",

                skills: [],

                github: "",

                linkedin: "",

                portfolio: "",

                resume: {
                    name: "",
                    size: 0,
                    type: "",
                    data: "",
                },
            });
        }

        /* -------------------------------------------------
           GENERATE JWT
        ------------------------------------------------- */

        const token = generateToken(user);

        console.log(
            "Google login successful:",
            user.email
        );

        return res.status(200).json({
            success: true,
            message: "Google authentication successful",
            token,
            user: formatUser(user),
        });

    } catch (error) {
        console.error(
            "Google OAuth Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};


/* =========================================================
   GITHUB LOGIN
========================================================= */

export const githubLogin = async (req, res) => {
    try {
        const { code, accountType } = req.body;

        console.log("========== GITHUB LOGIN ==========");

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "GitHub authorization code is required",
            });
        }

        if (!accountType) {
            return res.status(400).json({
                success: false,
                message: "Account type is required",
            });
        }

        if (!["student", "stakeholder"].includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type",
            });
        }

        const githubClientId =
            process.env.GITHUB_CLIENT_ID;

        const githubClientSecret =
            process.env.GITHUB_CLIENT_SECRET;

        if (!githubClientId || !githubClientSecret) {
            return res.status(500).json({
                success: false,
                message:
                    "GitHub OAuth credentials are missing in server .env",
            });
        }

        /* -------------------------------------------------
           EXCHANGE CODE FOR ACCESS TOKEN
        ------------------------------------------------- */

        const tokenResponse = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",

                headers: {
                    Accept: "application/json",
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    client_id: githubClientId,
                    client_secret: githubClientSecret,
                    code,
                }),
            }
        );

        const tokenData =
            await tokenResponse.json();

        if (!tokenData.access_token) {
            console.error(
                "GitHub token error:",
                tokenData
            );

            return res.status(401).json({
                success: false,
                message:
                    "Failed to authenticate with GitHub",
            });
        }

        const accessToken =
            tokenData.access_token;

        /* -------------------------------------------------
           GET GITHUB USER
        ------------------------------------------------- */

        const githubUserResponse =
            await fetch(
                "https://api.github.com/user",
                {
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`,
                        Accept:
                            "application/vnd.github+json",
                    },
                }
            );

        const githubUser =
            await githubUserResponse.json();

        if (!githubUser.id) {
            return res.status(401).json({
                success: false,
                message:
                    "Failed to get GitHub user",
            });
        }

        /* -------------------------------------------------
           GET GITHUB EMAIL
        ------------------------------------------------- */

        let email = githubUser.email;

        if (!email) {
            const emailsResponse =
                await fetch(
                    "https://api.github.com/user/emails",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${accessToken}`,
                            Accept:
                                "application/vnd.github+json",
                        },
                    }
                );

            const emails =
                await emailsResponse.json();

            const primaryEmail =
                emails.find(
                    (item) =>
                        item.primary &&
                        item.verified
                );

            email =
                primaryEmail?.email ||
                "";
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "No verified email found on GitHub account",
            });
        }

        /* -------------------------------------------------
           FIND USER
        ------------------------------------------------- */

        let user = await User.findOne({
            email: email.toLowerCase(),
        });

        /* -------------------------------------------------
           EXISTING USER
        ------------------------------------------------- */

        if (user) {
            console.log(
                "Existing GitHub user:",
                user.email
            );

            if (user.accountType !== accountType) {
                return res.status(403).json({
                    success: false,
                    message: `This account is registered as ${user.accountType}. Please select ${user.accountType} when logging in.`,
                });
            }

            user.authProvider = "github";
            user.providerId =
                String(githubUser.id);

            if (!user.photo && githubUser.avatar_url) {
                user.photo =
                    githubUser.avatar_url;
            }

            if (
                !user.github &&
                githubUser.html_url
            ) {
                user.github =
                    githubUser.html_url;
            }

            await user.save();
        }

        /* -------------------------------------------------
           NEW USER
        ------------------------------------------------- */

        else {
            console.log(
                "Creating new GitHub user:",
                email
            );

            user = await User.create({
                name:
                    githubUser.name ||
                    githubUser.login ||
                    "GitHub User",

                email: email.toLowerCase(),

                password: "",

                accountType,

                authProvider: "github",

                providerId:
                    String(githubUser.id),

                photo:
                    githubUser.avatar_url ||
                    "",

                github:
                    githubUser.html_url ||
                    "",

                profileCompleted: false,

                organizationName: "",

                organizationDescription: "",

                website: "",

                college: "",

                branch: "",

                year: "",

                role: "MERN Developer",

                location: "",

                bio: "",

                availability: "Available",

                skills: [],

                linkedin: "",

                portfolio: "",

                resume: {
                    name: "",
                    size: 0,
                    type: "",
                    data: "",
                },
            });
        }

        /* -------------------------------------------------
           GENERATE JWT
        ------------------------------------------------- */

        const token = generateToken(user);

        console.log(
            "GitHub login successful:",
            user.email
        );

        return res.status(200).json({
            success: true,
            message:
                "GitHub authentication successful",
            token,
            user: formatUser(user),
        });

    } catch (error) {
        console.error(
            "GitHub OAuth Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "GitHub authentication failed",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};