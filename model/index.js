import pgconfig from "../confi/db.postgre.confi.js"; // importing databse configuration
import Sequelize from "sequelize"; // importing sequelize ORM
import tutorial from "./tutorial.model.js";  // imporitng the tutorial schema file

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

const db = {
    Sequelize:Sequelize,
    sequelize:sequelize,
    //sequelize - used to make schema inside the tutorial
    //Sequelize - used for defining the standard data types from the "sequelize" module
    tutorials:tutorial(sequelize,Sequelize) // getting access of tutotial schema
}

export default db;