const mongoose=require('mongoose');
const {User}=require("../model/user");



const ticketShema=new mongoose.Schema({
    date: {type:Date},
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postName: {type:String},
    numero: {type:String},
    statusTicket: {type:String}

  
})
const Ticket=mongoose.model("Ticket",ticketShema);
exports.Ticket=Ticket;