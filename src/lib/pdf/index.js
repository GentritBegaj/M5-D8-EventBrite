import { createWriteStream } from "fs";
import fs from "fs-extra";
import { join } from "path";
import PdfPrinter from "pdfmake";
import { pipeline } from "stream";
import { promisify } from "util";
import { getCurrentFolderPath } from "../fs-tools.js";

const asyncPipeline = promisify(pipeline);

export const generatePDF = async (data) => {
  try {
    const fonts = {
      Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    const docDefinition = {
      content: [
        { text: "Your booking info", style: "header" },
        `First name: ${data.firstName}`,
        `Last name: ${data.secondName}`,
        `Email:${data.email}`,
        `Time of Arrival: ${data.toa}`,
        `Booking ID: ${data.id}`,
      ],
    };

    const printer = new PdfPrinter(fonts);

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition);

    const pdfPath = join(
      getCurrentFolderPath(import.meta.url),
      "../../data/PDFs",
      `${data.id}.pdf`
    );
    pdfReadableStream.end();
    return pdfReadableStream;
    // await asyncPipeline(pdfReadableStream, createWriteStream(pdfPath));
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while creating PDF");
  }
};
