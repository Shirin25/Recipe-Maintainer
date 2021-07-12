const express= require('express')
const app=express()
const mongoose=require('mongoose')
const User=require('./models/user')
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/userDB",{
	useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false}
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine",'ejs')
app.get("/",function(req,res){
	res.render("index")
})
app.get("/register",function(req,res){
	res.render("register")
})
app.post('/login',function(req,res){
	//
})
app.post('/register',function(req,res){
	const email=req.body.email
	const password=req.body.password

	const newUser=new User({
		email:email,
		password:password
	})

	newUser.save(err=>{
		err?console.log(err):res.send("Successfully created User")
	})
})
app.listen(3000,function(){
	console.log('server started on port 3000')
})