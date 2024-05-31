import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDbUrl } from "./config.js";
import todoRoutes from "./routes/todoRoutes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes)

mongoose
  .connect(
    mongoDbUrl
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log("Server ki koi galti nhi hai");
    });
  })
  .catch(() => {
    console.log("failed to connect to Database");
  });
