import { Router } from "express";
import  { deleteWebsiteDomain, getAllWebsitesDomain,getSpecificWebsiteAndThereContents,registerWebsite, updateSpecificWebsiteDomainDetails } from "../controllers/websiteController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const websiteRouter = Router();

websiteRouter.route('/').get(getAllWebsitesDomain)
                        .post(registerWebsite);
                       
websiteRouter.route('/:domainId').put(updateSpecificWebsiteDomainDetails)
                                .get(getSpecificWebsiteAndThereContents)
                                .delete(deleteWebsiteDomain);


export default websiteRouter;