// import { Router } from "express";
// import { loginUser, logoutUser, registerUser } from "../controllers/consumer-controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controllers/consumer-controller.js";
import { profileImageUpload } from "../middlewares/upload.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// User Authentication Routes
userRouter.post(
  "/users/register",
  profileImageUpload.single("profilePicture"),
  registerUser
);

userRouter.post("/users/verify-email", verifyEmail);

userRouter.post("/users/login", loginUser);

userRouter.post("/logout", authenticate, logoutUser);

export default userRouter;
