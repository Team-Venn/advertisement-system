import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import vennaceRouter from "./routes/advert-routes.js";
import userRouter from "./routes/consumer-routes.js";

// Database Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    throw new Error("Database connection error:", error);
  }
}
// Call the function to connect to the database
await connectToDatabase();

// Creating a Server app
const app = express();
app.use(express.json());

const port = process.env.PORT || 3999;
app.use(cors());

//using routes
// app.use("/api/v1", vendorRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", vennaceRouter);

app.listen(port, () => {
  console.log(`Server is listeing on ${port}`);
});

// example link : https://wa.link/vr324s
