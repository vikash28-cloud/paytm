const express = require("express");
const cors = require("cors");
const { dbconnection } = require("./db");
const mainRouter  = require("./routes/route.js");
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})

