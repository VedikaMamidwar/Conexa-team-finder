const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Conexa" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

function teammateRequestEmail({ toName, fromName, message }) {
  const requestsUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/requests`;

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#F8FAFC; padding:32px;">
    <div style="max-width:480px; margin:0 auto; background:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0;">
      <div style="background:#1E1B4B; padding:24px 28px;">
        <p style="margin:0; color:#5eead4; font-size:12px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;">Conexa</p>
        <h1 style="margin:8px 0 0; color:#FFFFFF; font-size:20px;">New Teammate Request</h1>
      </div>
      <div style="padding:28px;">
        <p style="margin:0 0 12px; color:#1E1B4B; font-size:15px;">Hi ${toName},</p>
        <p style="margin:0 0 16px; color:#475569; font-size:14px; line-height:1.6;">
          <strong>${fromName}</strong> wants to team up with you on Conexa.
        </p>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px 16px; margin:0 0 20px; color:#475569; font-size:14px; font-style:italic;">
          "${message}"
        </div>
        <a href="${requestsUrl}" style="display:inline-block; background:#14B8A6; color:#FFFFFF; text-decoration:none; font-weight:700; font-size:14px; padding:12px 22px; border-radius:10px;">
          View Request
        </a>
      </div>
    </div>
  </div>`;
}

module.exports = { sendEmail, teammateRequestEmail };