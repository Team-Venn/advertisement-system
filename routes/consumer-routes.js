import { Router } from "express";
import { consumerValidator } from "../validators/consumer-validators.js";
import { loginConsumer, logoutConsumer, registerConsumer } from "../controllers/consumer-controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";




const consumerRouter = Router();

consumerRouter.post('/consumers/register', consumerValidator, registerConsumer);

consumerRouter.post('/consumers/login', loginConsumer);

consumerRouter.post('/consumers/logout', authenticate, logoutConsumer);

export default consumerRouter;