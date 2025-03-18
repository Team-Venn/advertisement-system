import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import vendorRouter from "./routes/vendor-routes.js";
import consumerRouter from "./routes/consumer-routes.js";

// Database Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
// Call the function to connect to the database
connectToDatabase();

// Creating a Server app
const app = express();
const port = process.env.PORT || 3999;
app.use(cors());

//using routes
app.use("/api/v1", vendorRouter);
app.use("/api/v1", consumerRouter);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listeing on ${port}`);
});
