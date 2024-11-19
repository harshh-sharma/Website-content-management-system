import {Router} from "express";
import {register,login,logout,getUserProfile,updateUser} from "../controller/userController.js";

import isAuthenticated from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",isAuthenticated,logout);
userRouter.get("/profile",isAuthenticated,getUserProfile);
userRouter.put("/update",isAuthenticated,updateUser);

export default userRouter;