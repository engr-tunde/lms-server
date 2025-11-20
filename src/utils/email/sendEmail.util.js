const nodemailer = require("nodemailer");

const sendEmail = (subject, message, send_to) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
    to: send_to,
    replyTo: process.env.APP_EMAIL,
    subject: `${subject} - ${process.env.APP_NAME}`,
    html: message,
  };

  transporter.sendMail(options, function (err, result) {
    if (err) {
      console.log("Error! - ", err);
    }
    console.log(result);
  });
};

module.exports = sendEmail;
