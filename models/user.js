const mongoose= require("mongoose")


const usersSchema = new mongoose.Schema({
	 email: String,
	password: String
})

const user= new mongoose.model('user',usersSchema)
module.exports=user