
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export default async function ensureAdmin() {
    const name = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    // Never create an admin without server-side credentials.
    if (!name || !email || !password) {
        throw new Error(
            "Missing ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD in backend .env"
        );
    }

    if (password.length < 12) {
        throw new Error(
            "ADMIN_PASSWORD must contain at least 12 characters."
        );
    }

    // Do not overwrite an existing admin or reset their password.
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        console.log("Admin account already exists.");
        return existingAdmin;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
        active: true,
    });

    console.log("Initial admin account created successfully.");

    return admin;
}

