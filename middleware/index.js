const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const {JWT_SECRET} = require("../config");

async function check(req,res,next)
{
    const token = req.headers.token;
    const checkthetoken = await jwt.verify(token , JWT_SECRET);
    if(checkthetoken)
    {
        req.UserID = checkthetoken.id;
        next();
    }
    else
    {
        res.status.json({
            msg : "incorrect credentials !"
        });
    }
} 

module.exports={
    check
};