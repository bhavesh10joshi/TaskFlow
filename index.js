const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const todo = express(); 
todo.use(express.json());
const { UserRouter } = require("./user/index");
main();
todo.use(cors());
async function main()
{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(" Connection Successfull !");
        todo.listen(3000);
    }
    catch(e)
    {
        console.log(e);
        console.log("connection unsucessfull ! ");
    }
}
todo.use("/User" , UserRouter);