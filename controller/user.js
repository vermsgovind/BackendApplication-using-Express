// This file is using actual database

import {User} from "../model/user.js";
//imported the collection which we have created inside model

export const getUsers = (req,res)=>{
  
  User.find().then(
    (result)=>{
      res.send(result);
    }
  ).catch(
    (err)=>{
      res.status(500).send({
        error:true,
        message:"Got error while fetching all the users form DB"
      })
    }
  )
}

export const getUserById = (req, res)=>{
 
  if(req.params.id == "age"){
    getUsersByAge(req, res);
  }
  else{
    User.findById(req.params.id).then(
      (result)=>res.send(result)
    ).catch(
      (err)=>res.status(500).send({
        error:true,
        message:err
      })
    );
  }
 

}

export const saveUser = (req, res)=>{

  const userData = req.body;
// 1. check the minimal requirement(i.e all attributes are having values or not)
  if(userData.name==null || userData.age==null|| userData.username==null || userData.password==null){
    res.status(402).send({
      error:true,
      message:"User Data Missing. Include name, age, username, password"
    });
  }
  const user1 = new User({
    name:req.body.name,
    age:req.body.age,
    username:req.body.username,
    password:req.body.password
  });
  user1.save().then(
    (result)=>res.status(201).send(result)
  ).catch(
    (err)=>res.status(500).send({
      error:true,
      message:err
    })
  );
  
}


export const deleteUserById = (req, res)=>{
  User.findByIdAndDelete(req.params.id).then(
    (result)=>res.send(result)
  ).catch(
    (err)=>res.status(500).send({
      error:true,
      message:err
    })
  );
}

export const updateNameById = (req,res)=>{

  User.findByIdAndUpdate(req.params.id,{
    name:req.body.name
  }).then(
    (result)=>res.send(result)
  ).catch(
    (err)=>res.status(500).send({
      error:true,
      message:err
    })
  );
  
}


// use of aggregation
export const getUsersByAge = (req,res)=>{
     User.aggregate(
      //  [{$sort:{age:1}}]
      [{$match:{age:"23"}}]
     ).then(
       (result)=>{
         res.send(result);
       }
     ).catch(
      (err)=>res.status(500).send({
        error:true,
        message:err
      })
     );
}


//JSON DATA FORMAT FOR USER
// {
//   "name": "dipender",
//   "age": 22,
//   "username": "govind@gmail.com",
//   "password": "Aashiqui3@34",
//   "id": "a0550e95-f76b-416c-83a1-a1be3c1f3ecf"
// }