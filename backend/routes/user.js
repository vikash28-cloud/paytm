// backend/routes/user.js
const express = require('express');
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config');
const zod = require("zod")
const { user, Account } = require('../db');
const { authMiddleware } = require("../middleware.js")


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

router.post("/signup", async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    // schema validation using zod
    const zodSuccess = signupSchema.safeParse(req.body);
    if (!zodSuccess.success) {
        return res.status(411).json({
            msg: "please enter valid crendentials"
        })
    }
    // check for existing user
    const dbuser = await user.findOne({ username });
    if (dbuser) {
        return res.status(411).json({ msg: "user already exists" })
    }

    // creating new user
    const newUser = await user.create({
        firstName, lastName, username, password
    });

    await Account.create({
        userId: newUser._id,
        balance: (1 +Math.random() * 10000).toFixed(2)
    })
    // creating jwt token 
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);



    return res.status(200).json({
        message: "User Created Succesfully",
        token: token
    })

})


router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    // schema validation using zod
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "please enter valid crendentials"
        })
    }
    const existUser = await user.findOne({ username });
    if (!existUser) {
        return res.json({
            msg: "incorrect email or password"
        })
    }
    if (existUser.password !== req.body.password) {
        return res.json({
            msg: "incorrect Email or password"
        })

    }
    const token = jwt.sign({ userId: existUser._id }, JWT_SECRET);
    return res.status(200).json({
        msg: "Logged In successfully",
        token: token
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "error while updating information"
        })
    }
    await user.updateOne({ _id: req.userId }, req.body);
    return res.json({
        message: "Update Sucessfully"
    })
})

// filter users
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    // console.log(filter);
    try {
        const users = await user.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        })
        res.json({
            MatchedUsers: users.map(user => ({

                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })


    } catch {
        res.json({
            msg: "there is an error !"
        })
    }


})

module.exports = router;