//In this file are using mongoDB as a database
import express from "express";
import bodyParser from "body-parser"; 
import userRoutes from "./routes/user.js";
import mongoose from "mongoose"; // mongoose is a mongoDB client

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



