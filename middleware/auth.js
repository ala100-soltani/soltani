const jwt=require('jsonwebtoken');


module.exports=function(req,res,next){


    const token= req.header('Authorization');
    if(!token){

        return res.status(401).send('access denied')
    }
    try{
        const decodeToken= jwt.verify(token,'webtoken');
        req.user=decodeToken;
        next()


    }catch(e){

        res.status(400).send('wrong token');
    }

}
