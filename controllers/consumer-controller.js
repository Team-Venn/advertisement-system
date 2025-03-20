import { loginUserValidator, userValidator} from "../validators/consumer-validators.js";
import { UserModel } from "../models/consumer-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/mailer.js";

// User Registration
export const registerUser = async (req, res) => {
  const { error, value } = userValidator.validate({
    ...req.body,
    profilePicture: req.file?.filename
  });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if Username Exists
  const existingUser = await UserModel.findOne({ username: value.username });

  if (existingUser) {
    return res.status(409).json({ message: "Username Already exists" });
  }

  // Hash password and create New User
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  const verificationCode = crypto.randomBytes(3).toString('hex');

  const newUser = await UserModel.create({
    email: value.email,
    username: value.username,
    password: hashedPassword,
    role: value.role, // Ensure role is assigned
    shopName: value.role === "vendor" ? value.shopName : undefined,
    whatsappContact: value.role === "vendor" ? value.whatsappContact : undefined,
    openHours: value.role === "vendor" ? value.openHours : undefined,
    profilePicture: value.role === "vendor" ? value.profilePicture : undefined,
    verificationCode: verificationCode,
    verified: false
  });

  //send verification email
  await sendVerificationEmail(value.email, verificationCode, newUser.username )

  return res.status(201).json({
    // // Use shopName if provided, otherwise fall back to fullName
    Message: value.shopName 
    ? `Welcome ${value.shopName} to Vennace, Please verify your email.` 
    : `Welcome ${value.username} to Vennace, Please verify your email.`,
    data: newUser
  });
};

export const verifyEmail = async (req, res) => {
  const {email, verificationCode} = req.body;

  const user = await UserModel.findOne({ email });

  if (!user){
    return res.status(404).json({ message: "Email not found"})
  }

  if (user.verificationCode !== verificationCode) {
    return res.status(400).json({ message: "Invalid Verification Code"})
  }

  user.verified = true;
  await user.save();

  return res.status(200).json({message: "Email Verified Successfully"})
}



// User Login
export const loginUser = async (req, res) => {

  const { error, value } = loginUserValidator.validate(req.body);

  // Check if there's a validation error
  if (error) {
      return res.status(409).json(error);
  }

  const { email, password } = value;

  // Find the user by email
  const user = await UserModel.findOne({email: value.email});
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the user has verified their email
  if (!user.verified) {
    return res.status(403).json({ message: "Your email is not verified. Please verify your email to sign in." });
}

  // Validate password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate Token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // Respond with the Token
  res.status(200).json({ message: "Login Successful", token });
};

// User Logout
export const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
