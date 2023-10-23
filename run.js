const express= require('express')
const session = require('express-session')
const bodyParser =require('body-parser')
const connectDB = require('./configs/db')
const login = require('./Route/login');
const register = require('./Route/Register');
const home = require('./Route/home');
const logout = require('./Route/wantedsession');
const createposts = require('./Route/createposts')
// const update = require('./Routers/update')
// const remove = require('./Routers/remove')
// const post = require('./Route/post');
const path = require('path')
const bcrypt = require('bcrypt');
const app = express();
const PORT= 3000;
global.loggin = null;

try{
connectDB();
app.use(session({
    secret: 'secret',
}))
app.use('*',(req,res,next)=>{
    loggin = req.session.user_id
    username = req.session.user_username;
    next();
})
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message
    next();
})
app.use(express.static("uploads"));
app.use("",require("./Route/createposts"))
app.use("",require("./Route/home"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.use('/wantedsession',logout);
app.use('/login',login);
app.use('/',home);
// app.use('/update',update);
app.use('/register',register);
app.use('/createposts',createposts)


// app.use('/remove',remove)
// app.use('/post',post)

app.listen(PORT,()=>{
    console.log(`App Server is running at port http://localhost:${PORT} `)
})
}catch (err)  {
    console.error('An error occurred:', err);
  };
  
 