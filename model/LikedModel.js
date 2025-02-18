const mongoose = require("mongoose");

const LikedSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,  
    },
    imageUrl: {
        type: String,
        required: true, 
    }
});

const LikedModel = mongoose.model("likes", LikedSchema);

module.exports = LikedModel;
