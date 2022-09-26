const {Employee}=require('../model/employee_poste');
const {Ticket}=require("../model/ticket");

const mongoose=require('mongoose');

let date=new Date();
exports.getLogin=  (req, res) =>{
    res.redirect('login');
   
  
}

exports.postLogin=async(req,res)=>{
    
    let employee= await Employee.findOne({email:req.body.email});
    if(!employee){
        return res.redirect('/login');

    }
    if(req.body.password == employee.password){
        req.session.isAuth=true;
       req.session.employeeID=employee._id;
        res.redirect('/dashboard');
    }
    
}
exports.postLogout=(req,res)=>{

    req.session.destroy(()=>{
        res.redirect('/')
    })
}
exports.getTickets=async (req,res)=>{
    var time=date.toISOString().split('T')[0];
    var variable;

    let employee=await Employee.findById({_id:req.session.employeeID });
    let ticket=await Ticket.find({postName:employee.postName,statusTicket:"non traite",date:time}).populate('user');
   
    

    
   
    res.render('ticket',{tickets:ticket});
   
   
    

    

   
    
    
        

    
    
}
exports.update=async (req,res)=>{
    
        var time=date.toISOString().split('T')[0];
    
    let id=req.params.id
    let ticket=await Ticket.findById({_id:id,statusTicket:"non traite",date:time});
    ticket.statusTicket="traite";
    await ticket.save();
    
    
    res.redirect('/ticket');
    

    
   
}
    
    
   
