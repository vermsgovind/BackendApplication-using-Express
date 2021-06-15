import jwt from "jsonwebtoken";
import {secret} from "../confi/auth.config.js"; // importing secret key
import pgdb from "../model/index.js";
const user = pgdb.users; // getting access of users table

const verifyToken =(req,res,next)=>{
  
  //getting the token from req headers
  let token = req.headers["x-access-token"];

  //if token does not exist in headers then send error
  if(!token){
    res.status(403).send({
        message:"No token provided! Forbidden"
    })
  }

  //now you have token so proceed for verifying token
  jwt.verify(token,secret,(err,decode)=>{
      if(err){
          res.status(401).send({
              message:"Unautorized token"
          })
      }
     req.userID = decode.id;// adding the id of user in req for next fn
     next(); // will be a fn call to check role of user i.e let isAdmin
  });
}

// After verifying token we need to check for the roles of user

const isAdmin = (req, res, next)=>{
    user.findByPk(req.userID)
    .then(
        user=>{
            user.getRoles()// gettting the Roles attribute value from user table
            .then(
                roles=>{ // if any role in roles array is admin that means user is admin 
                    for(let i=0; i<roles.length; i++){
                      if(roles[i].name=="admin"){
                          console.log("user is admin");
                          next();
                          return
                      }
                    }
                    //user is not an admin
                    res.status(403).send({
                        message:"User is not admin"
                    })
                }
            )
            .catch( (err)=>{
                res.status(500).send({
                  error:true,
                  message:"Got error during getRoles in is admin fn of authJWT.js file"
                })
              })
        }
    )
    .catch( (err)=>{
        res.status(500).send({
          error:true,
          message:"Got error while finding user by using findByPk fn in isadmin fn of authJWT.js file"
        })
      })
}

const isModerator = (req, res, next)=>{
    user.findByPk(req.userID)
    .then(
        user=>{
            user.getRoles()// gettting the Roles attribute value from user table
            .then(
                roles=>{ // if any role in roles array is admin that means user is admin 
                    for(let i=0; i<roles.length; i++){
                      if(roles[i].name=="moderator"){
                          console.log("user is Moderator");
                          next();
                          return
                      }
                    }
                    //user is not an admin
                    res.status(403).send({
                        message:"User is not Moderator"
                    })
                }
            )
            .catch( (err)=>{
                res.status(500).send({
                  error:true,
                  message:"Got error during getRoles in isModerator fn of authJWT.js file"
                })
              })
        }
    )
    .catch( (err)=>{
        res.status(500).send({
          error:true,
          message:"Got error while finding user by using findByPk fn in isModerator fn of authJWT.js file"
        })
      })
}

const isModeratorOrAdmin = (req, res, next)=>{
    user.findByPk(req.userID)
    .then(
        user=>{
            user.getRoles()// gettting the Roles attribute value from user table
            .then(
                roles=>{ // if any role in roles array is admin that means user is admin 
                    for(let i=0; i<roles.length; i++){
                      if(roles[i].name=="moderator"||roles[i].name=="admin"){
                          console.log("user is Moderator or Admin");
                          next();
                          return
                      }
                    }
                    //user is not an admin
                    res.status(403).send({
                        message:"User is not Moderator and not admin"
                    })
                }
            )
            .catch( (err)=>{
                res.status(500).send({
                  error:true,
                  message:"Got error during getRoles in isModeratorOrAdmin fn of authJWT.js file"
                })
              })
        }
    )
    .catch( (err)=>{
        res.status(500).send({
          error:true,
          message:"Got error while finding user by using findByPk fn in isModeratorOrAdmin fn of authJWT.js file"
        })
      })
}

export const authJWT = {
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isModerator:isModerator,
    isModertorOrAdmin:isModeratorOrAdmin  
}
