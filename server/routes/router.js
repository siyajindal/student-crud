const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");




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
            const adduser = new users({
                roll,name,classes,enrol,fees,mail,intro
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
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

 




module.exports = router;
 