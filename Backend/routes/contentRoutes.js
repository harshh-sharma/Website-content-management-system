import { Router } from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {addContent,deleteSpecificContent,getAllContent, getDomainSpecificContent, updateDomainSpecificContent} from "../controllers/contentController.js";
import upload from "../middleware/multerMiddleware.js";

const contentRouter = Router();

contentRouter.route('/').get(getAllContent)
                        .post(upload.single("image"),addContent);

contentRouter.route('/:domainId').get(getDomainSpecificContent);

contentRouter.route('/:contentId').put(updateDomainSpecificContent)
                                  .delete(deleteSpecificContent)
export default contentRouter;