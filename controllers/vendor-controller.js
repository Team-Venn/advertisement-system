import { VendorModel } from "../models/vendor-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { vendorValidator } from "../validators/vendor-validators.js";


// New Vendor Registration
export const registerVendor = async (req, res) => {
  const { error, value } = vendorValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if Vendor Username Exists
  const existingUser = await VendorModel.findOne({ username: value.username });

  if (existingUser) {
    return res.status(409).json({ message: "Username Already exists" });
  } else {
    // If not hash Password and Create  New Vendor
    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newVendor = await VendorModel.create({
      restaurantName: value.restaurantName,
      username: value.username,
      password: hashedPassword,
      whatsappContactLink: value.whatsappContactLink,
      openHours: value.openHours,
      category: value.category,
    });
    return res.status(201).json({
      message: `Welcome ${value.restaurantName} to Vennace.`,
      data: newVendor,
    });
  }
};

// vendor login
export const loginVendor = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Find the vendor by username
    const vendor = await VendorModel.findOne({ username });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    //if found, compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Generate Token
    const token = jwt.sign({ vendorId: vendor.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Respond with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in vendor", error: error.message });
  }
};

// Vendor Logout - Simple implementation
export const logoutVendor = async (req, res) => {
  // Notify client to delete token; no server-side action necessary unless blacklisting implemented.
  res.status(200).json({ message: "Logout successful" });
};



// Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
    const vendorId = req.vendorId; // Assuming vendorId is attached after authentication
    const profilePictureFile = req.file.filename; // Assuming multerSaveFilesOrg gives us the URL of the uploaded image

    try {
        await VendorModel.findByIdAndUpdate(vendorId, { profilePicture: profilePictureFile});

        res.status(200).json({
            message: 'Profile picture uploaded successfully',
            profilePicture: profilePictureFile
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error uploading profile picture',
            error: error.message
        });
    }
};
