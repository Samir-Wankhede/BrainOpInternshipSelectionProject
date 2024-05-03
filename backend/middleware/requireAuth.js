import jwt from "jsonwebtoken";
import { db } from "../server.js";

const requireAuth = async (req,res,next) => {

    const token = req.cookies.jwt

    try{
       const {email} = jwt.verify(token, process.env.SECRET)
       req.user = await db.query("SELECT * FROM people WHERE email=$1",[email,])
       next()
    }catch(error){
        res.status(401).json({error:"request not authorised"})
    }

}

export default requireAuth;