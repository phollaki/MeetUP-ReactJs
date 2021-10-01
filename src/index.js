import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import api from "./routes/api.js";
dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api, cors({ origin: "*" }));

const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME, PORT } = process.env;

const initDB = async () => {
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: DB_NAME,
    }
  );

  mongoose.connection
    .once("open", () => {
      console.info("Connected to MongoDB");
    })
    .on("error", (error) => {
      console.error("MongoDB connection error: ", error);
    });
};

initDB();

app.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});

app.listen(PORT, () => {
  console.info(`Server listening on localhost:${PORT}`);
});
