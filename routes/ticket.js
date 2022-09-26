const express = require('express');
const router=express.Router();

const {Ticket}=require("../model/ticket");


const auth=require('../middleware/auth');

  


let date=new Date();
router.post('/courant',auth, async (req,res)=>{
    var time=date.toISOString().split('T')[0];
    ticketnum= await Ticket.find({statusTicket:"traite",date:time,postName:req.body.postName}).count();
    go=ticketnum.toString();

res.json({"numero":go});    
});
router.get('/',auth, async (req,res)=>{
    
    ticketPerson= await Ticket.find({user:req.user._id});
    
  

res.json(ticketPerson);   
});
router.get('/custom',auth, async (req,res)=>{
    var time=date.toISOString().split('T')[0];
    ticketPerson1= await Ticket.find({user:req.user._id}).sort({_id:-1}).limit(1);
    
  

res.json(ticketPerson1); 
    
      
});



router.post('/',auth,async (req, res) =>{
    var time=date.toISOString().split('T')[0];
   

//    if(new Date().getHours()>=6 && new Date().getHours()<=16 ){
        
   
    
        var ticket=await Ticket.findOne({user:req.user._id,date:time})
      
        if(ticket){
           
            
           
           
           return res.status(404).send({"error":"user has a ticket"});


        }else{
            try{
                ticket= await Ticket.find({postName:req.body.postName,date:time}).count();
            var name= ticket
            var wwe=name.toString();
            var yes=parseInt(wwe)+1;
            ticket=new Ticket({
                date:time,
                user:req.user._id,
                postName:req.body.postName,
                numero:yes,
                statusTicket:"non traite"

            })
            await ticket.save();
            return res.send(ticket);
            }catch(e){
                ticket=new Ticket({
                    date:time,
                    user:req.user._id,
                    postName:req.body.postName,
                    numero:"1"
    
                })
                await ticket.save();
                

            }
            
        }
//  }else {
        res.status(404).json({"error":"serveur ocupee"});
    // }    
  });

  module.exports=router;
