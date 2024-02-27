const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // 1)create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Zoombie <hello@boda.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3)Actually send the email

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
