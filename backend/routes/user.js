// backend/routes/user.js
const express = require('express');
const jwt  = require('jsonwebtoken')
const JWT_SECRET = require('../config');
const zod = require("zod")
const { user } = require('../db');



const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),

})

const signinSchema = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signup", async(req, res) => {
    const { firstName, lastName, username, password } = req.body;

    // schema validation using zod
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"please enter valid crendentials"
        })
    }
    // check for existing user
   const dbuser = await user.findOne({ username });
   if(dbuser) {
        console.log("feriro")
        return res.status(411).json({msg:"user already exists"})
    }

    // creating new user
    const newUser = await user.create({
        firstName,lastName,username,password
    });
    // creating jwt token 
    const token = jwt.sign({userID :newUser._id},JWT_SECRET);



    return res.status(200).json({
        message:"User Created Succesfully",
        token:token
    })

})


router.post("/signin",async(req,res)=>{
    const {username,password} = req.body;
     // schema validation using zod
     const {success} = signinSchema.safeParse(req.body);
     if(!success){
         return res.status(411).json({
             msg:"please enter valid crendentials"
         })
     }
    const existUser = await user.findOne({username});
    if(!existUser){
        return res.json({
            msg:"incorrect email or password"
        })
    }
    if(existUser.password!==req.body.password){
       return  res.json({
            msg:"incorrect Email or password"
        })
 
    }
    const token = jwt.sign({userID:existUser._id},JWT_SECRET);
    return res.status(200).json({
        msg:"Logged In successfully",
        token:token
    })
})

module.exports = router;