// utils/sendEmail.js

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Stop Wasting Food 👨‍🍳" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📨 Email envoyé à :", to);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
  }
};

module.exports = sendEmail;
