import { Router } from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from "uniqid";
import fs from "fs-extra";
import { sendEmail } from "../lib/email/index.js";
import { generatePDF } from "../lib/pdf/index.js";

const pathToAttendees = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/attendees.json"
);

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const attendees = await fs.readJSON(pathToAttendees);
    res.send(attendees);
  } catch (err) {
    const error = new Error(err.message);
    error.httpStatusCode = 500;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const attendees = await fs.readJSON(pathToAttendees);
    const newAttendeeObj = {
      ...req.body,
      id: uniqid(),
    };
    attendees.push(newAttendeeObj);
    await fs.writeJSON(pathToAttendees, attendees);
    // await generatePDF(newAttendeeObj);
    await sendEmail(newAttendeeObj);
    res.send(attendees);
  } catch (err) {
    const error = new Error(err.message);
    error.httpStatusCode = 500;
    next(error);
    // console.log(err);
  }
});

export default router;
