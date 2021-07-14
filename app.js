const express= require('express')
const app=express()
const mongoose=require('mongoose')
const User=require('./models/user')
const Recipe=require('./models/recipe')
const port= process.env.PORT || 3000


require('dotenv').config({ path: '.env' })

const bodyParser = require("body-parser");

mongoose.connect(process.env.ATLAS_URL,{
	useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

let posts=[]

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine",'ejs')
app.get("/",function(req,res){
	res.render("index")
})
app.get("/register",function(req,res){
	res.render("register")
})

app.get("/login",function(req,res){
	res.render("login")
})
app.get("/allRecipes",function(req,res){
	res.render("allRecipes",{
		posts:posts
	})
})
app.get("/addRecipe",function(req,res){
	res.render("addRecipe")
	
})
app.post("/addRecipe",function(req,res){

	    const recipeTitle=req.body.RecipeTitle
		const ingredients=req.body.Ingredients
		const procedure=req.body.Procedure
		const author=req.body.author
	const post={
		recipeTitle:req.body.RecipeTitle,
		ingredients:req.body.Ingredients,
		procedure:req.body.Procedure,
		author:req.body.author
	}
	const recipe=new Recipe({
		recipeTitle:recipeTitle,
		ingredients:ingredients,
		procedure:procedure,
		author:author
	})
	recipe.save(err=>{
		err?console.log(err):res.render("allRecipes",{posts:posts})
	})
	posts.push(post)
	res.redirect("allRecipes")
})
app.get("/logout",function(req,res)
{
	res.render("login")
})
app.post('/login',function(req,res){
	const email=req.body.email
	const password=req.body.password

	User.findOne({email:email},(err,foundResults) => {
		if(err)
		{
			console.log("err")
		}
		else 
		{
			if(foundResults.password === password)
			{
				//res.send("You have successfully logged in")
				res.redirect("allRecipes")
			}
			else
			{
				res.send("Incorrect Password or Email id!")
			}
		}
	})

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
app.listen(port,function(){
	console.log('server started on port 3000')
})