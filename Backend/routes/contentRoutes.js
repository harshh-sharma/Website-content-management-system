import { Router } from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {addContent,deleteSpecificContent,getAllContent, getDomainSpecificContent, updateDomainSpecificContent} from "../controllers/contentController.js";
import upload from "../middleware/multerMiddleware.js";

const contentRouter = Router();

contentRouter.route('/').get(isAuthenticated,getAllContent)
                        .post(isAuthenticated,upload.single("image"),addContent);

contentRouter.route('/:domainId').get(isAuthenticated,getDomainSpecificContent);

contentRouter.route('/:contentId').put(isAuthenticated,updateDomainSpecificContent)
                                  .delete(isAuthenticated,deleteSpecificContent)
export default contentRouter;