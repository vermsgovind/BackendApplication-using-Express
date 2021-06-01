// In this file, first we defined the structure of schema(data) using schema of mongoose
// Then we have created a collection(using model fn of moongoose) in mongoDB database 
// that will store data as per structure of schema. 
// We have also exported the created collection for using in controller.

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({  // we are defining a schema with attributes name, age, username,password
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true}); // the timestamps will create two more attribute i.e createdtime and updatedtime

export const User = mongoose.model('User',userSchema);// the User inside model will be available as collection in DB
// this User now pointing to the created collection 