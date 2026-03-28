const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Your 16-digit code
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: `"SehatDost Support" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #2ecc71;">SehatDost Healthcare</h2>
                <p>${options.message}</p>
                <br />
                <p>This is an automated notification for your SehatDost account.</p>
            </div>
        `,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
