const mongoose= require("mongoose")


const recipeSchema = new mongoose.Schema({
	 recipeTitle: String,
	ingredients: String,
	procedure: String,
	author: String
})

const recipe= new mongoose.model('recipe',recipeSchema)
module.exports=recipe