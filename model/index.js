import pgconfig from "../confi/db.postgre.confi.js"; // importing databse configuration
import Sequelize from "sequelize"; // importing sequelize ORM
import tutorial from "./tutorial.model.js";  // imporitng the tutorial schema file
import user from "./user.model.js"; 
import role from "./role.model.js"; 

//Connecting sequelize with postgreSql database by passing its configuration detail to sequelize
const sequelize = new Sequelize(pgconfig.DB, pgconfig.USERNAME,pgconfig.PASSWORD,{
    host:pgconfig.HOST,
    dialect: pgconfig.DIALECT,
    port: pgconfig.PORT,
    operatorAliases:false,
    pool:{
        max:pgconfig.max,
        min:pgconfig.min,
        idle:pgconfig.idle,
        acquire:pgconfig.acquire
    }
})


//sequelize - used to make schema inside the tutorial
//Sequelize - used for defining the standard data types from the "sequelize" module
const db = {
    Sequelize:Sequelize,
    sequelize:sequelize,
    tutorials:tutorial(sequelize,Sequelize),// getting access of tutotial schema
    users:user(sequelize,Sequelize),
    roles:role(sequelize,Sequelize)
}
db.roles.belongsToMany(db.users,{ // one role can be taken by many user
    through:"user_role", // will be available as a table in database
    foreignKey:"roleId",
    otherKey:"userId"
})
db.users.belongsToMany(db.roles,{ // one user can have many role
    through:"user_role",
    foreignKey:"userId",
    otherKey:"roleId"
})
db.ROLES = ["user","admin","moderator"]
export default db;