const express = require("express");
const { authMiddleware } = require("../middleware");
const { user, Account } = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware ,async(req,res)=>{
    console.log(req.userId);
    try{
   
        const userAccount = await Account.findOne({
            userId:req.userId
        })
        
        res.json({
            msg:"success",
            balance:userAccount.balance
        })
    }
    catch{
        res.json({msg:"there is an error"})
    }
    
})

router.post("/transfer",async(req,res)=>{

})



module.exports = router;