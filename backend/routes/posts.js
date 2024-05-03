import express from "express";
import {
    get_profilePic,
    changePassword,
    get_posts,
}
from '../controllers/postsController.js'
import requireAuth from "../middleware/requireAuth.js"; //Authentication of user Before Accessing Protected Routes

const router = express.Router();

router.use(requireAuth)

router.get('/profilePicture',get_profilePic); //To fetch profile pic to display
router.post('/changepassword', changePassword); //To change Password
router.get('/posts',get_posts); //To get posts in paginated form

export default router;
