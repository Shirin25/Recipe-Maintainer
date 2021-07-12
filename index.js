const express= require('express')
const app=express()

app.use(express.static("public"))
app.set("view engine",'ejs')
app.get("/",function(req,res){
	res.send("<h1> hello</h1?")
})
app.listen(3000,function(){
	console.log('server started on port 3000')
})