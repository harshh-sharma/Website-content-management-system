import { Router } from "express";
import  { getAllWebsitesDomain,registerWebsite } from "../controllers/websiteController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const websiteRouter = Router();

websiteRouter.route('/').get(isAuthenticated,getAllWebsitesDomain)
                        .post(isAuthenticated,registerWebsite);

export default websiteRouter;