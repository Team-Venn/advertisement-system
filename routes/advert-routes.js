import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js"; // Your authentication middleware
import { deleteAdvert, getAdvertById, getAdverts, postAdvert, updateAdvert } from "../controllers/advert-controller.js";
import { advertImageUpload } from "../middlewares/upload.js";

const vennaceRouter = Router();


// Advertisement Routes
vennaceRouter.post('/adverts', authenticate, advertImageUpload.array('pictures',3), postAdvert);

vennaceRouter.get('/adverts', getAdverts); 

vennaceRouter.get('/adverts/:id', getAdvertById); 

vennaceRouter.put('/adverts/:id', authenticate, updateAdvert); 

vennaceRouter.delete('/adverts/:id', authenticate, deleteAdvert); 

export default vennaceRouter;