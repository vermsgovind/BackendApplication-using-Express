import db from "../model/index.js";
const Tutorial = db.tutorials;  // now Tutorial will be having access to schema i.e our table
const Op = db.Sequelize.Op // op means operator

export const  getTutorialByID =(req,res)=>{
    // this findByPk api we got from sequelize 
    //bz using sequelize we defined the shcema or table
   Tutorial.findByPk(req.params.id)
   .then(
       result=>{
           res.send(result)
       }
   )
   .catch(
       err=>res.status(404).send(err)
   )
}

export const getAllTutorialByTitle = (req, res)=>{
    var title = req.query.title
    var condition = title?{title:{[Op.ilike]:`${title}`}}:null
    Tutorial.findAll({where:condition})
         .then(
             data=>res.status(201).send(data)
         )
         .catch(
            (err)=>{
                res.status(500).send({
                  error:true,
                  message:"some error occured while db operation"
                })
              }
         )
}

export const createTutorial = (req, res)=>{
//TODO : check the mandatory fields and throw error resposne id reuired
  const tutorial ={
      title: req.body.title,
      description: req.body.description,
      published: req.body. published
  }
  Tutorial.create(tutorial)
          .then(
            data=>res.status(201).send(data)
            )
          .catch(
            (err)=>{
                res.status(500).send({
                  error:true,
                  message:"some error occured while db operation"
                })
              }
            )
}

export const deleteAllTutorial =(req,res)=>{
    Tutorial.destroy(
        {
            where:{},
            truncate:false
        }
    )
    .then(
      result=>res.status(201).send({
          message:`${result} tutorials got deleted`
      })
      )
    .catch(
      (err)=>{
          res.status(500).send({
            error:true,
            message:"some error occured while db operation"
          })
        }
      )
}

export const deleteTutorialById =(req, res)=>{
    Tutorial.destroy(
        {
            where:{id:req.params.id}
        }
    )
    .then(
      result=>{
          if(result == 1){
                res.status(200).send({
                message:`${result} tutorial got deleted`
            })
          }
          else{
                res.status(201).send({
                message:`${req.params.id} does not exist in table`
            })
          }
      }
      )
    .catch(
      (err)=>{
          res.status(500).send({
            error:true,
            message:"some error occured while db operation"
          })
        }
      )
}