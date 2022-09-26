const mongoose=require('mongoose');
const bcrypt=require('bcrypt');




const employeeSchema=new mongoose.Schema({
    email: {type:String,
        required :true,
     },
   password: {type:String,
    required :true,
  },
    postName: {type:String},
    

  
})
const Employee=mongoose.model('Employee',employeeSchema);
exports.Employee=Employee;



