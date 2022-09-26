const express = require('express');
const _=require('lodash');
const bcrypt=require('bcrypt');
const router=express.Router();
const mongoose=require('mongoose');
const {User}=require("../model/user");
const joi=require('joi');
const jwt=require('jsonwebtoken');

router.post('/' , async(req, res)=>{
    const {error}= validate(req.body);
    if (error){
        return res.status(404).send({"error":error.details[0].message});
    }
let user= await User.findOne({email:req.body.email});
if (!user){
return res.status(404).send({"error":"invalid email or password"});
}
  
    const checkPassword= await bcrypt.compare(req.body.password,user.password);
    if (!checkPassword){
        return res.status(404).send({"error":"invalid email or password"});
        }
const token=user.generateTokens();
 res.json({"token":token});
});
function validate(req){

    const shema=joi.object({

        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(8).max(1000).required()

    })
    return shema.validate(req);
}

module.exports=router;