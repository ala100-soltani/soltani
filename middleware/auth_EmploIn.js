module.exports=function(req,res,next){
    if(req.session.isAuth){
        res.redirect('/dashboard');
    }else {
        next()
    }
}