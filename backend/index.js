import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDb from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

// global middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("I am active");
});

// start server
const runServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:`, PORT);
    });
  } catch (err) {
    console.log("Error in starting server.", err);
  }
};
runServer();
