import { Router } from "express";
import { registerWebsite } from "../controller/websiteController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const websiteRouter = Router();

websiteRouter.post('/add',isAuthenticated,registerWebsite);

export default websiteRouter;