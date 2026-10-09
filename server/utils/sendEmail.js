
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"CONEXA Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "CONEXA Password Reset OTP",
        html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background-color: #ffffff;
      ">
        <h1 style="
          color: #1E1B4B;
          margin-bottom: 10px;
        ">
          CONEXA
        </h1>

        <h2 style="
          color: #111827;
        ">
          Password Reset
        </h2>

        <p style="
          color: #4b5563;
          font-size: 16px;
        ">
          We received a request to reset your CONEXA password.
        </p>

        <p style="
          color: #4b5563;
          font-size: 16px;
        ">
          Your OTP is:
        </p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          padding: 20px;
          background: #f3f4f6;
          text-align: center;
          border-radius: 10px;
          color: #1E1B4B;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p style="
          color: #4b5563;
          font-size: 15px;
        ">
          This OTP will expire in <strong>10 minutes</strong>.
        </p>

        <p style="
          color: #6b7280;
          font-size: 14px;
        ">
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <br />

        <p style="
          color: #4b5563;
          font-size: 15px;
        ">
          Regards,<br />
          <strong>CONEXA Team</strong>
        </p>
      </div>
    `,
    });
};

