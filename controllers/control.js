const {User,userValidate}=require("../model/user");

exports.getuser= async (req, res) =>{
    const user=await User.find().sort('name');
      res.send(user); 
}