import bcryptjs from "bcryptjs";
import db from "../model/index.js"; 
import jwt from "jsonwebtoken";
import {secret} from "../confi/auth.config.js";
const User = db.users;// get access of user database
const Role = db.roles; // get access of roles database.
const Op = db.Sequelize.Op; // for using operators

// implementing signup fn
export const signup =(req, res)=>{
    //check username , email, password exist or not
    //encrypt the password 
    // store all data in database
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcryptjs.hashSync(req.body.password,8)// will divide password in 8 parts
    })
    .then( // now we will do a cross check that role in req is valid or not. This time we will use role table inspit of using roles array which we have used in middleware fn for validating the role
       user =>{
           if(req.body.roles){ // if roles exist in body
             Role.findAll({ // will reurn all the matched roles form Role table--Here Role is table
                 where:{
                     name:{ // don't forget to use name attribute
                        [Op.or]:req.body.roles
                     }
                  
                 } 
             })
             .then(
                 roles=>{
                     user.setRoles(roles)
                     .then(
                         res.status(201).send({
                             message:"Signup completed"
                         })
                     )
                     .catch( (err)=>{
                        res.status(500).send({
                          error:true,
                          message:"Got error during setRoles in Signup fn"
                        })
                      })
                 }
             )
             .catch( (err)=>{
                res.status(500).send({
                  error:true,
                  message:"Got error while using findAll fn in Signup fn"
                })
              })
           }
       }
    )
    .catch( (err)=>{
        res.status(500).send({
          error:true,
          message:"Got error while create fn in Signup fn"
        })
      })
    console.log(bcryptjs.hashSync(req.body.password,8))

}

// implementing signin fn
export const signin =(req, res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(
        user=>{
           var isPasswordValid = bcryptjs.compareSync(req.body.password, user.password) //comp..Sync(decrepted password, encrypted password) returns a boolean value
              if(!isPasswordValid){ // if pass. is not valid
                 res.status(401).send({
                     message:"Invalid Password"
                 })
              }
              // ok so username and password is verified
              // now let us build token
              var token = jwt.sign({id:user.id},secret,{ // inside signature we are providing payload data 
                    expiresIn:86400
              });
             var authorities =[];
              user.getRoles()
              .then(
                  roles=>{
                      for(let i=0; i<roles.length; i++){
                        authorities.push("ROLE_"+roles[i].name.toUpperCase())
                      }
                      res.status(200).send({
                        token:token,
                        username:user.username,
                        roles:authorities
                    })
                    
                  }
              ).catch((err)=>{
                res.status(500).send({
                  error:true,
                  message:"Got error while getting roles in signin fn in controller"
                })
              })
        }
    )
    .catch((err)=>{
        res.status(500).send({
          error:true,
          message:"Got error while using findOne fn in Signup fn"
        })
      })
}