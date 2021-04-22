import sgMail from "@sendgrid/mail";
import { generatePDF } from "../pdf/index.js";
import { streamToString } from "../../utils/pdf/streamToString.js";

export const sendEmail = async (user) => {
  console.log(user);
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const pdfStreamSource = await generatePDF(user);
    const attachment = await streamToString(pdfStreamSource);

    const msg = {
      to: user.email,
      from: process.env.Sender_EMAIL,
      subject: "This is an email from Gentrit",
      text: "Just trying to send an email",
      html: "<strong>HELLO WORLD</strong>",
      attachments: [
        {
          content: attachment,
          filename: "booking.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
};
