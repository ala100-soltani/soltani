const express = require('express');
const router=express.Router();
const {postLogin,postLogout,getTickets,update}=require('../controllers/auth_Controller_Admin');


const {Employee}=require('../model/employee_poste');
const isAuth=require('../middleware/auth_Emp');
const verif=require('../middleware/auth_EmploIn');



router.get('/dashboard',isAuth,(req,res)=>{
    res.render('dashboard')
})
router.get('/',isAuth,(req,res)=>{
    
    res.redirect('/dashboard');
});
router.get('/login',verif,(req,res)=>{
    res.render('login');
});

router.post('/login',postLogin);
router.post('/logout',postLogout);

router.get('/ticket',isAuth,getTickets);
router.post('/ticket/:id',isAuth,update);

module.exports=router;
