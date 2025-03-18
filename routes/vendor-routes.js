import { Router } from "express";
import { vendorValidator } from "../validators/vendor-validators.js";
import { loginVendor, logoutVendor, registerVendor, uploadProfilePicture } from "../controllers/vendor-controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { profileImageUpload } from "../middlewares/upload.js";


const vendorRouter = Router();

vendorRouter.post('/vendors/register', vendorValidator, registerVendor );

vendorRouter.post('/vendors/login', loginVendor);

// Vendor Logout Route
vendorRouter.post('/vendors/logout', authenticate, logoutVendor);

// Profile Picture Upload Route
vendorRouter.post('/vendors/uploadProfilePicture', authenticate, profileImageUpload.single('Profile-Image'), uploadProfilePicture);

export default vendorRouter;