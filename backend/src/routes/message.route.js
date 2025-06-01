import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersforsidebar,  SendMessage, } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersforsidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, SendMessage);

export default router;