import pg from "pg";
import bcrypt from "bcrypt";
import { db } from "../server.js";
import jwt from "jsonwebtoken";

const saltrounds = 10;
const maxAge = 3 * 24 * 60 * 60
const createToken = (email) => {
  return jwt.sign({email},process.env.SECRET,{expiresIn: maxAge})
}

//postlogin
const checkUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const result = await db.query("SELECT sp.* FROM people_password sp JOIN people s ON sp.id = s.email WHERE s.email = $1", [
          email,
        ]);
        const namerow = await db.query("SELECT * FROM people WHERE people.email = $1",[email,])
        const name = namerow.rows[0].name
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword,(err,yes_or_no)=>{
            if (err){
              console.log("ERROR IN COMPARE");
            }else{
              const token = createToken(email)
              if (yes_or_no) {
                res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000});
                res.status(201).json({name,email});
                //console.log("ok");
              } else {
                res.status(400).json({error:"incorrect password"});
              }
            }
          });
        } else {
            res.status(400).json({error:"user does not exist go Sign Up"});
        }
      } catch (err) {
        res.status(400).json({error: err})
        console.log(err)
      }
};

//postregister
const createUser = async (req,res)=>{
    const {name, email, password, confirmed_password, picture_url} = req.body;
    if (password!== confirmed_password){
        return res.status(400).json({error:"Password and Confirmation doesn't match"})
    }
        try{
            const if_present = await db.query("SELECT * FROM people WHERE email = $1",[email]);
            if (if_present.rows.length>0){
                return res.status(400).json({error: "User already present go to Sign In"})
            }else{
                bcrypt.hash(password,saltrounds,async (err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        //console.log("ok");
                        await db.query("INSERT INTO people (name,email,picture) VALUES ($1,$2,$3)",[name,email,picture_url]);
                        //console.log("ok2");
                        await db.query("INSERT INTO people_password(id,password) VALUES ($1,$2)",[email,hash]);
                        const token = createToken(email)
                        res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000});
                        res.status(201).json({name,email})
                    }
                });
            }
        }catch(err){
          res.status(400).json({error: err})
        }
        //console.log({name, email, reg_id, password, confirmation_password, gender});
};

const get_logout = (req,res) => {
  res.cookie('jwt','',{maxAge: 1})
  res.json({message: "Logged out"})
}

export {
    checkUser,
    createUser,
    get_logout,
}