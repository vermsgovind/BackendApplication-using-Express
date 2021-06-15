//In this file are using mongoDB as a database
import express from "express";
import bodyParser from "body-parser"; 
import userRoutes from "./routes/user.js";
import mongoose from "mongoose"; // mongoose is a mongoDB client

import tutorialRoutes from "./routes/tutorial.js";
import pgdb from "./model/index.js";
import authRoutes from "./routes/auth.routes.js";

const Role = pgdb.roles;//getting the access of roles schema
function initializeDB(){
    Role.create(
        {
            id:1,
            name:"admin"
        }
    )
    Role.create(
        {
            id:2,
            name:"moderator"
        }
    )
    Role.create(
        {
            id:3,
            name:"user"
        }
    )
}


//sync() will creates new tables according to the schema specified in the model
pgdb.sequelize.sync({force:true}) // force:true means whenever we will start our application
.then(                            // we will get fresh or enpty table
    result=>{                    
        console.log(result);
        initializeDB(); //will initailize roles table with roles
    }
)
.catch(
    err=>{
        console.log(err);
    }
)

var corsOption ={
    origin:"http://localhost:8000"
}


const app = express();
const PORT = 8888;
const dbURL = 'mongodb+srv://vermsgovind:Aashiqui2@@cluster0.qj414.mongodb.net/tutorialApp?retryWrites=true&w=majority';

mongoose.connect(dbURL,{//connect is for starting the database//Also connect returns a promise
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result)=>{
    // console.log("result");
    console.log("connected to the database");
    app.listen(PORT,()=>{ // now we are starting server after starting the database
        console.log(`server is running at http://127.0.0.1:${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})

app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.send("welcome to homepage");
})

app.use("/user",userRoutes);
app.use("/tutorial",tutorialRoutes);
app.use("/api/auth", authRoutes)
// app.use(corsOption)

// use this when you dont want to use mongodb
// console.log("connected to the database");
// app.listen(PORT,()=>{ // now we are starting server after starting the database
//     console.log(`server is running at http://127.0.0.1:${PORT}`);
// })

