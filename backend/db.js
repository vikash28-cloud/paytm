const mongoose = require("mongoose");

const dbconnection = mongoose.connect("mongodb://localhost:27017/paytm").then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log("error while connecting to db")
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        trim: true,

        minLength: 3,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLenght:50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLenght:50
    },
})

const user = mongoose.model("user", userSchema);

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model("Account",accountSchema);

module.exports = { user,dbconnection,Account }