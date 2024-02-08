require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router=require("./routes/router");


const port=8003;
app.use(cors());
app.use(express.json());

app.use(router);

const DB="mongodb+srv://siya105jindal:BoJaLgLLLrjJgvbT@cluster0.ceapzll.mongodb.net/?retryWrites=true&w=majority";

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

