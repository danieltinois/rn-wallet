import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

// Middleware to parse JSON bodies
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.send("Hello World! The server is running.");
});

app.use("/api/transactions", transactionsRoute);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
