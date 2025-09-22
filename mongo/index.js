const mongoose = require("mongoose");
const schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId;

const user = new schema({
    Password : String , 
    Email : { type : String , unique : true},
    Firstname : String , 
    Lastname : String
});  

const todo = new schema({
    UserId : ObjectId , 
    Title : String , 
    Date : String ,
    Priority : String ,
    Status : Boolean ,
});  

const UserModel = mongoose.model("User" , user);
const TodoModel = mongoose.model("Todo" , todo);

module.exports = {
    UserModel : UserModel ,
    TodoModel : TodoModel 
};

