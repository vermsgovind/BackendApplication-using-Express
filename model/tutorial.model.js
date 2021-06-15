// defining the schema in this file
const tutorial = (sequelize,Sequelize)=>{
 const Tutorial = sequelize.define("tutorials",{
     title:{
         type:Sequelize.STRING
     },
     description:{
         type:Sequelize.STRING
     },
     published:{
         type:Sequelize.BOOLEAN
     }
 },{
     timestamp:true
 })
 return Tutorial
}
export default tutorial