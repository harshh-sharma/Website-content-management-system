import { Router } from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {addContent,deleteSpecificContent,getAllContent, getDomainSpecificContent, updateDomainSpecificContent} from "../controllers/contentController.js";

const contentRouter = Router();

contentRouter.route('/').get(isAuthenticated,getAllContent)
                        .post(isAuthenticated,addContent);

contentRouter.route('/:domainId').get(isAuthenticated,getDomainSpecificContent);

contentRouter.route('/:contentId').put(isAuthenticated,updateDomainSpecificContent)
                                  .delete(isAuthenticated,deleteSpecificContent)
export default contentRouter;