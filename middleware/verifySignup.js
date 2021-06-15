import pgdb from "../model/index.js";
const ROLE = pgdb.ROLES; // getting access of roles array
const User = pgdb.users; // getting access of user table

export const checkDuplicateUsernameOrEmail =(req, res, next)=>{
    User.findOne({  // checking is username already exists ?
        where:{
            username:req.body.username
        }
    })
    .then(user=>{
        if(user){ // if username already exist
            res.sataus(400).send({
                message:"Failed! usename already exist"
            })
            return
        }
        //if username not exist then check for email 
        User.findOne({  // checking is email already exists ?
            where:{
                username:req.body.email
            }
        })
        .then(email=>{
            if(email){ // if username already exist
                res.sataus(400).send({
                    message:"Failed! email already exist"
                })
                return
            }
            //now it seens username and email are unique so we can proceed to next function
            next(); // in series of fn's next fn will get call
        })
        .catch( (err)=>{
            res.status(500).send({
              error:true,
              message:"Got error from verifySignup while using 2nd findOne fn"
            })
          })
    })
    .catch( (err)=>{
        res.status(500).send({
          error:true,
          message:"Got error from verifySignup while using first findOne fn"
        })
      })
}



export const checkRolesExisted = (req,res,next)=>{
    for(let i=0; i<req.body.roles.length; i++){
        if(ROLE.includes(req.body.roles[i])==false){
            res.status(400).send({
                message:"Failed! Roles does not exist"+req.body.roles[i]
            })
            return;
        }
    }
    // if our code reach to current that means all roles[i] are valid
    // so just call next fn
    next();
}

