import express from "express";
import {
    createUser,
    checkUser,
    get_logout
}
from "../controllers/userController.js"

const router = express.Router();

router.post("/signup",createUser);
router.post("/signin",checkUser);
router.get("/logout",get_logout);

export default router;