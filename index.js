import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { populate } from "./data/populateDB.js";
import colleges from "./routes/colleges.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// DANGER: do this only once to populate a database.
// Previous data will be erased.
app.post("/api/populate", populate);

app.use("/api/colleges", colleges);

app.listen(port, () => console.log(`Server started at port ${port}...`));

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGODB_CONNECTION_URL);
mongoose.connection.on("connected", () =>
  console.log("Connected to MongoDB Atlas...")
);
mongoose.connection.on("error", () =>
  console.error("Could not connect to MongoDB Atlas...")
);
