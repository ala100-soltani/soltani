const mongoose=require('mongoose');
const joi=require('joi');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullname: {type:String,
         required :true,
        minlength:3,
    maxlength:44},
    email: {type:String,
        required :true,
       minlength:3,
       unique:true,
   maxlength:200},
   password: {type:String,
    required :true,
   minlength:8,
maxlength:200}
})
userSchema.methods.generateTokens=function (){
    const token= jwt.sign({_id:this._id},'webtoken')
    return token;
}

const User =mongoose.model('User',userSchema);
function userValidate(user){

    const shema=joi.object({

        fullname: joi.string().min(3).max(44).required(),
        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(8).max(1000).required()

    })
    return shema.validate(user);
}
exports.User=User;
exports.userValidate=userValidate;
