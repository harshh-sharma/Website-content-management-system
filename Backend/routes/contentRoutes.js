import { Router } from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {addContent,getAllContent, getDomainSpecificContent, updateDomainSpecificContent} from "../controllers/contentController.js";

const contentRouter = Router();

contentRouter.route('/').post(isAuthenticated,addContent)
                         .get(isAuthenticated,getAllContent);

contentRouter.route('/:domainId').get(isAuthenticated,getDomainSpecificContent);

contentRouter.route('/:contentId').put(isAuthenticated,updateDomainSpecificContent);

export default contentRouter;