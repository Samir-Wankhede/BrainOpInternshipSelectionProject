import express from "express";
import {
    get_profilePic,
    changePassword,
    get_posts,
}
from '../controllers/postsController.js'
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth)

router.get('/profilePicture',get_profilePic);
router.post('/changepassword', changePassword);
router.get('/posts',get_posts);

export default router;