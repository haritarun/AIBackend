const { default: mongoose, model } = require("mongoose");

const imageSchema = new mongoose.Schema({
    prompt:{
        type:String,
        trim:true,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    }
   
},{
    timestamps:true,
})

const ImageModel = mongoose.model("images",imageSchema)

module.exports = ImageModel