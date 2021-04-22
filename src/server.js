import express from "express";
import cors from "cors";
import attendeesPaths from "./attendees/index.js";

const server = express();

const port = process.env.PORT;

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      console.log("ORIGIN", origin);
      next(null, true);
    } else {
      next(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());
server.use("/attendees", attendeesPaths);

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Server running on cloud on port", port);
  } else {
    console.log("Server running locally on port", port);
  }
});
