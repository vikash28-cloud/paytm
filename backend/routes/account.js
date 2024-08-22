const express = require("express");
const { authMiddleware } = require("../middleware");
const { user, Account } = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    console.log(req.userId);
    try {

        const userAccount = await Account.findOne({
            userId: req.userId
        })

        res.json({
            msg: "success",
            balance: userAccount.balance
        })
    }
    catch {
        res.json({ msg: "there is an error" })
    }

})

router.post("/transfer", authMiddleware, async (req, res) => {
    
    const { amount, to } = req.body;
    
    const account = await Account.findOne({
        userId: req.userId
    });

  
    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({
        userId: to
    });

    
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }


    Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    ).then(() => {
        return Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        );
    }).then(() => {
        res.json({
            message: "Transfer successful",
            balance: "Amount left " + (account.balance - amount)  // Subtract the transferred amount from the initial balance
        });
    }).catch((error) => {
        res.status(500).json({
            message: "Transfer failed",
            error: error.message
        });
    });











})



module.exports = router;