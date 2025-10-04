import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter;

export const getTransporter = async () => {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USERNAME,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });

  return transporter;
};

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: "WeatherApp <noreply@weatherapp.com>",
    to,
    subject,
    html,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
