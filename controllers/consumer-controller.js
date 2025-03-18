import { consumerValidator } from "../validators/consumer-validators.js";
import { ConsumerModel } from "../models/consumer-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// New Consumer Registration
export const registerConsumer = async (req, res) => {
  const { error, value } = consumerValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //Check if Consumer Username Exists
  const existingUser = await ConsumerModel.findOne({
    username: value.username,
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username Already exists" });
  } else {
    //if not, hash password and create New Consumer
    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newConsumer = await ConsumerModel.create({
      fullName: value.fullName,
      username: value.username,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: `Welcome ${value.fullName} to Vennace.`,
      data: newConsumer,
    });
  }
};

//consumer login
export const loginConsumer = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the consumer by username
    const consumer = await ConsumerModel.findOne({ username });
    if (!consumer) {
      return res.status(400).json({ message: "Consumer not found" });
    }

    // If found, compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, consumer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate Token
    const token = jwt.sign(
      { consumerId: consumer.id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Respond with the Token
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in consumer", error: error.message });
  }
};

export const logoutConsumer = async (req, res) => {
    // Notify client to delete token; no server-side action necessary unless blacklisting implemented.
    res.status(200).json({ message: "Logout successful" });
  };
  