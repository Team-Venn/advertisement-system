import { Router } from "express";
import { authenticate, isAuthorized } from "../middlewares/auth.middleware.js"; // Your authentication middleware
import {
  deleteAdvert,
  getAdvertById,
  getAdverts,
  getVendorAdverts,
  getVendorAdvertsById,
  postAdvert,
  replaceAdvert,
  updateAdvert,
} from "../controllers/advert-controller.js";
import { advertImageUpload } from "../middlewares/upload.js";

const vennaceRouter = Router();

// Advertisement Routes
vennaceRouter.post(
  "/adverts",
  authenticate,
  isAuthorized(["vendor"]),
  advertImageUpload.array("pictures", 3),
  postAdvert
);

vennaceRouter.get(
  "/adverts",
  authenticate,
  isAuthorized(["consumer"]),
  getAdverts
);

vennaceRouter.get(
  "/vendor-adverts",
  authenticate,
  isAuthorized(["vendor"]),
  getVendorAdverts
);

vennaceRouter.get(
  "/adverts/:id",
  authenticate,
  isAuthorized(["consumer"]),
  getAdvertById
);

vennaceRouter.get('/vendor-advert/:id', authenticate, isAuthorized(["vendor"]), getVendorAdvertsById)

vennaceRouter.patch(
  "/adverts/:id",
  authenticate,
  isAuthorized(["vendor"]),
  advertImageUpload.array("pictures", 3),
  updateAdvert
);

vennaceRouter.put(
  "/re-adverts/:id",
  authenticate,
  isAuthorized(["vendor"]),
  advertImageUpload.array("pictures", 3),
  replaceAdvert
);

vennaceRouter.delete(
  "/adverts/:id",
  authenticate,
  isAuthorized(["vendor"]),
  deleteAdvert
);

export default vennaceRouter;
