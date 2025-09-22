const express = require("express");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const UserRouter = Router();
const mongoose = require("mongoose");
UserRouter.use(express.json());
const {z} = require("zod");
const {UserModel, TodoModel} = require("../mongo/index");
const {check} = require("../middleware/index");
const {JWT_SECRET} = require("../config");
const bcrypt = require("bcrypt");
UserRouter.post("/login" , async function(req,res)
{
    const email = req.body.email;
    const password = req.body.password;

    /* search the username is the database and then get the password*/
    const find = await UserModel.findOne({
        Email : email
    });

    if(find)
    {
        const upadatedpassword = await bcrypt.compare(password , find.Password);
        if(upadatedpassword)
        {
            const token = jwt.sign({
                id : find._id
            }, JWT_SECRET);

            res.json({
                token : token
            }); 
        } 
        else
        {
            res.status(404).json({});
        }
    }
    else
    {
        res.status(404).json({});
    }
});
UserRouter.post("/signup",async function(req,res)
{
    const safeobject = z.object({
        firstname : z.string().min(1),
        lastname : z.string().min(1),
        password : z.string().min(4).max(16)  , 
        email : z.string().includes('@')     
    });
    const objectparsed = safeobject.safeParse(req.body); 

    if(objectparsed)
    {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;

    const hashedpassword = await bcrypt.hash(password , 5);

    try{
        await UserModel.create({
            Firstname : firstname , 
            Lastname : lastname , 
            Email : email ,
            Password : hashedpassword
        }); 
    
        res.json({});
    }    
    catch(e)
    {
        res.status(404).json({});
    }
    }
    else{
        res.status(404).json({});
    }
}); 

UserRouter.use(check);

UserRouter.post("/settodo" , async function(req,res)
{
    const objectparse = z.object({
        title : z.string().min(1) ,
        date : z.string(),
        priority : z.string().min(2),
        status : z.boolean()
    });  

    const safeobjectparse = objectparse.safeParse(req.body);
    const title = req.body.title;
    const date = req.body.date;
    const priority = req.body.priority;
    const UserId = req.UserID;
    const status = req.body.status;
    console.log(UserId);
    
    if(safeobjectparse)
    {
        try{
        await TodoModel.create({
        Title : title , 
        Date : date , 
        Priority : priority , 
        Status : status , 
        UserId : UserId
        });
        res.json({});
        }
        catch(e)
        {
        res.status(404).json({});
        }
    }
    else
    {
        res.status(404).json({});
    }
});   
UserRouter.use(check);
UserRouter.get("/details" , async function(req,res){
    const UserId = req.UserID;
    const find = await UserModel.findOne({
        _id : UserId
    });

    if(find)
    {   
        res.json({
            msg : find
        });
    }   
    else
    {
        res.status(404).json({});
    }
})
UserRouter.post("/profile/edit" , async function(req,res){
    const UserId = req.UserID;
    const info = req.body.info;
    console.log(UserId);
    console.log(info);
     console.log(data);
    try{
        const find = await UserModel.findOne({
            _id : UserId
        });
         console.log( find);
        if(find)
        {
            if(info == "Email")
            {
                const parsedobject = z.object({data :z.string().includes('@') });
                const safeparsedobject = parsedobject.safeParse(req.body);
                if(safeparsedobject)
                {
                    const data = req.body.data;
                await UserModel.updateOne(
                        { _id : UserId },
                        { $set: { Email : data } });
                res.json({});
                }
                else
                {
                    res.status(404).json({});
                }
            }
            else if(info == "Password")
            {
                const parsedobject = z.object({data :z.string().min(4).max(16)  });
                const safeparsedobject = parsedobject.safeParse(req.body);
                if(safeparsedobject)
                {
                    const data = req.body.data;
                await UserModel.updateOne(
                        { _id : UserId },
                        { $set: { Password : data } });  
                res.json({});  
                }
                else
                {
                    res.status(404).json({});
                }            
            }
            else if(info == "Firstname")
            {
                const parsedobject = z.object({data :z.string().min(1)});
                const safeparsedobject = parsedobject.safeParse(req.body);
                if(safeparsedobject)
                {
                    const data = req.body.data;
                await UserModel.updateOne(
                        { _id : UserId },
                        { $set: { Firstname : data } });     
                res.json({});  
                }
                else
                {
                    res.status(404).json({});
                }
            }
            else if(info == "Lastname")
            {
                const parsedobject = z.object({data :z.string().min(1)});
                const safeparsedobject = parsedobject.safeParse(req.body);
                if(safeparsedobject)
                {
                    const data = req.body.data;
                await UserModel.updateOne(
                        { _id : UserId },
                        { $set: { Lastname : data } });      
                res.json({});   
                }
                else
                {
                    res.status(404).json({});
                }                  
            }
            else
            {
                res.status(404).json({});
                return;
            }
        }
        else
        {
            res.status(404).json({});
        }
    }
    catch(e)
    {
        res.status(404).json({});
    }
});
UserRouter.get("/gettodo", async function(req, res)
{
    const UserId = req.UserID;

    const find = await TodoModel.find({
       UserId : UserId 
    });

    if(find)
    {
        res.json({
            msg : find
        })
    }
    else
    {
        res.status(404).json({});
    }
});
UserRouter.post("/deletetodo" , async function(req,res)
{
    const Todoid = req.body.Todoid;
    let objectId = new mongoose.Types.ObjectId(Todoid);
    const find = await TodoModel.findOne({
        _id : objectId
    });

    if(find){
        try{
            await TodoModel.deleteOne({
                _id : Todoid
            });
            res.json({});            
        }
        catch(e)
        {
            res.status(404).json({});
        }
    }
    else{
        res.status(404).json({});
    }
});
UserRouter.post("/todo/edit", async function(req,res)
{
    const TodoId = req.body.Todoid;
    let objectId = new mongoose.Types.ObjectId(TodoId);
    console.log("hello");
    const find = await TodoModel.findOne({
        _id : objectId
    });
    if(find)
    {
        try{
            await TodoModel.updateOne(
            { _id : objectId },
            { $set: { Status : true } });

            res.json({});
        }
        catch(e)
        {
            res.status(404).json({j:e});
        }
    }
    else
    {
        res.status(404).json({});
    }
});
module.exports = {
    UserRouter : UserRouter 
}; 