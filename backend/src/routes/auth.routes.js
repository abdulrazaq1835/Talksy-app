import express from "express";


import {  checkAuth, login,  loguot, signup, updateProfile, } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// import { checkAuth, updateProfile,  } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", loguot);

router.put("/update-profile", protectRoute, updateProfile);


router.get("/check", protectRoute,checkAuth );


export default router;