import {db} from '../server.js'
import bcrypt from 'bcrypt';

const saltrounds = 10;

const get_profilePic = async (req,res) => {
    try{
        const pic = req.user.rows[0].picture;
        res.status(200).json({pic})
    }
    catch (err) {
        res.status(400).json({error: err})
        console.log(err)
    }
}

const changePassword = async (req,res) => {
    const email = req.user.rows[0].email;
    const {oldpassword,newpassword,confirmed_newpassword} = req.body
    try {
        const result = await db.query("SELECT * FROM people_password WHERE id = $1", [
          email,
        ]);
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(oldpassword, storedHashedPassword,(err,yes_or_no)=>{
            if (err){
              console.log(err);
            }else{
              if (yes_or_no) {
                bcrypt.hash(newpassword,saltrounds, async (err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                    await db.query("UPDATE people_password SET password = $1 WHERE id = $2",[
                    hash,
                    email,
                ])
                console.log("success")
                }
              }) 
              res.status(200).json({message: "Password Changed"});
                //console.log("ok");
              } else {
                res.status(400).json({error:"incorrect old password"});
              }
            }
          });
      } catch (err) {
        res.status(400).json({error: err})
        console.log(err)
      }
}

const get_posts = async(req,res) =>{
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const startIndex = page*pageSize;
  try{
    const result = await db.query("SELECT id,photo_image_url,photo_submitted_at,photo_description,photographer_username,photo_location_name,ai_description FROM unsplash_photos WHERE id > $1 ORDER BY id ASC LIMIT $2",[
      startIndex,
      pageSize
    ])
    res.status(200).json(result);
  }
  catch(error){
    res.status(400).json({error: err})
    console.log(err)
  }
}


export {
    get_profilePic,
    changePassword,
    get_posts,
}