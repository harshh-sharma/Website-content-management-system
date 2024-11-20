import { Router } from "express";
import  { deleteWebsiteDomain, getAllWebsitesDomain,getSpecificWebsiteAndThereContents,registerWebsite, updateSpecificWebsiteDomainDetails } from "../controllers/websiteController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const websiteRouter = Router();

websiteRouter.route('/').get(isAuthenticated,getAllWebsitesDomain)
                        .post(isAuthenticated,registerWebsite);
                       
websiteRouter.route('/:domainId').put(isAuthenticated,updateSpecificWebsiteDomainDetails)
                                .get(isAuthenticated,getSpecificWebsiteAndThereContents)
                                .delete(isAuthenticated,deleteWebsiteDomain);


export default websiteRouter;