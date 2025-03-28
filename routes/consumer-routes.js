// import { Router } from "express";
// import { loginUser, logoutUser, registerUser } from "../controllers/consumer-controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

import { Router } from "express";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
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

userRouter.get('/users/me', authenticate, getAuthenticatedUser);

userRouter.post("/logout", authenticate, logoutUser);

userRouter.patch('/update-user-profile/:id', authenticate, profileImageUpload.single("profilePicture"), userProfile);

export default userRouter;
