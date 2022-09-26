const express = require('express');
const _=require('lodash');
const bcrypt=require('bcrypt');

  
  const router=express.Router();
  const mongoose=require('mongoose');
  const {User,userValidate}=require("../model/user");
  const auth=require('../middleware/auth');
  const {getuser}=require('../controllers/control');
  
  router.get('/',getuser);
  
  router.get('/profile',auth, async (req, res) =>{
    const profile=await User.findById(req.user._id).select('-password');
      res.send(profile); 
});




  
    


  router.post('/' , async(req, res)=>{
      const {error}= userValidate(req.body);
      if (error){
          return res.status(404).send({"error":error.details[0].message});
      }
 let user= await User.findOne({email:req.body.email});
 if (user){
  return res.status(404).send({"error":"user exist in database"});
}
     user = new User(_.pick(req.body,['fullname','email','password']));
     const saltRounds=10;
     const salt= await bcrypt.genSalt(saltRounds);
     user.password= await bcrypt.hash(user.password,salt);
  await user.save();
  const token=user.generateTokens();
   res.header('auth',token).send ({"message":_.pick(user,['fullname','email'])});
});
module.exports=router;