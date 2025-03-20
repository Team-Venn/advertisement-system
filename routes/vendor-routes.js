// import { Router } from "express";
// import { vendorValidator } from "../validators/vendor-validators.js";
// import { loginVendor, logoutVendor, registerVendor, uploadProfilePicture } from "../controllers/vendor-controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";
// import { profileImageUpload } from "../middlewares/upload.js";


// const vendorRouter = Router();

// vendorRouter.post('/vendors/register', registerVendor );

// vendorRouter.post('/vendors/login', loginVendor);

// vendorRouter.post('/vendors/logout', authenticate, logoutVendor);


// vendorRouter.post('/vendors/uploadProfilePicture', authenticate, profileImageUpload.single('Profile-Image'), uploadProfilePicture);

// export default vendorRouter;