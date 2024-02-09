const express = require("express");
const router = express.Router();
const users = require("../models/userSchema.js");

const { authenticateToken, createNewToken } = 
require('../controllers/jwt-controllers');

 
const { login, verifyToken,signup, updatePassword, logout } = 
require('../controllers/userController');
 
router.post('/signup', signup);
router.post('/login',login)
 
router.get('/logout', logout)
router.post('/token', createNewToken);


const Token = require('../models/token.js');

// register user

router.post("/register",async(req,res)=>{
    
    const {roll,name,classes,enrol,fees,mail,intro} = req.body;
    //   console.log(roll,name,classes,enrol,fees,mail,intro);
    if(!roll || !name || !classes || !enrol || !fees || !mail || !intro){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({mail:mail});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users(
         {
            roll,name,classes,enrol,fees,mail,intro
         }
            );
           
            await adduser.save();
            res.status(201).json(adduser);
        }

    } catch (error) {
        res.status(422).json({
            "msg" : "Error while registering",
            "error" : error
        });
    }
})

// get user data


router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

 
// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})



// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})


router.get("/stattable",async(req,res)=>{
    try {

        const userdata = await users.find ({fees : "Unpaid"});
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})
  
module.exports = router;
 