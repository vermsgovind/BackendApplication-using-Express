//Defining database configuration to be used by Sequelize
const pgconfig ={
    HOST:"localhost", // our database will be running at localhost 
    PORT:"5432", // means at this port our database will run
    DB:"tutorial",  // name of database server in database
    USERNAME:"postgres",
    PASSWORD:"Aashiqui2@",
    DIALECT:"postgres", // dialect will tell sequelize that the database is postgres database
    pool:{
        max:5, // means our application can make maxi. 5 connection with database at a time for handling multiple requests at a time
        min:0,  // means no restriction on our application to make a even single connection with database at a time
        acquire:30000, // for this time our B.E application will keep wait before throwing a error whenever any error occurred in database
        idle:10000 // this is the time for which our b.E appliction and database will remains connected
    }
}
export default pgconfig;