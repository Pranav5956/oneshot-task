import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

const port = process.env.PORT || 5000;
const app = express();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => console.log(`Server started at port ${port}...`));

mongoose.connect(process.env.MONGODB_CONNECTION_URL);
mongoose.connection.on("connected", () =>
  console.log("Connected to MongoDB Atlas...")
);
mongoose.connection.on("error", () =>
  console.error("Could not connect to MongoDB Atlas...")
);
