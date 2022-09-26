 const express =require('express');
const app = express();
const joi=require('joi');
const helmet= require('helmet')
const morgan= require('morgan');
const mongoose=require('mongoose');
const compression=require('compression');
const session=require('express-session');
const MongoDbStore=require('connect-mongodb-session')(session);
const routeAdmin=require('./routes/authAdmin');
mongoose.connect('mongodb://alaeddine:azqswx100@cluster0-shard-00-00.xml1x.mongodb.net:27017,cluster0-shard-00-01.xml1x.mongodb.net:27017,cluster0-shard-00-02.xml1x.mongodb.net:27017/login?ssl=true&replicaSet=atlas-14irfp-shard-0&authSource=admin&retryWrites=true&w=majority',{
    
     
 } ).then(()=>console.log('connect to database'))
 .catch((error)=>console.error(error));
 var Store=new MongoDbStore({
    uri:'mongodb://alaeddine:azqswx100@cluster0-shard-00-00.xml1x.mongodb.net:27017,cluster0-shard-00-01.xml1x.mongodb.net:27017,cluster0-shard-00-02.xml1x.mongodb.net:27017/login?ssl=true&replicaSet=atlas-14irfp-shard-0&authSource=admin&retryWrites=true&w=majority',
    collection:'sessions'

});
app.use(session({
   secret: 'this is a secret key',
  store:Store,
  resave: true,
  saveUninitialized: true

}));

const _=require('lodash');
const path=require('path');



app.use(express.static(path.join(__dirname,'assets')));

app.set('view engine','ejs');
app.set('views','views');
const auth=require('./routes/authentif');

const users=require('./routes/users');
const tickets=require('./routes/ticket');










 app.use(express.json(),express.urlencoded({extended:false}));
 
 app.use(helmet());
 app.use(compression());
 app.use(morgan('tiny'));

 app.use('/',routeAdmin);
 
 
 app.use('/api/users',users);
 app.use('/api/auth',auth);
 app.use('/api/tickets',tickets);
 
 


 
var port=process.env.PORT || 3000;

app.listen(port);