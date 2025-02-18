 
const {Together} = require("together-ai"); 
const { uploadBase64toImage } = require("../utils");
const ImageModel = require('../model/ImageModel');


const imageCart = async (req, res) => {
    try {
        const apikey = process.env.TOGETHER_AI_KEY
        
        const together = new Together({ apiKey: apikey });
        const { prompt } = req.body;

        console.log(prompt)
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
 
        const response = await together.images.create({
            prompt,
            model: "black-forest-labs/FLUX.1-dev", 
            width: 1024,
            height: 768,
            steps: 4,
            n: 1,
            response_format: "b64_json",
        });

        const base64 = response.data[0].b64_json
        const imageUrl = await uploadBase64toImage(base64)

        const newImage = new ImageModel({
            prompt,
            imageUrl
        })
        await newImage.save()
        
        res.status(200).json(imageUrl); 
    } catch (e) {
        console.log("Something went wrong", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getImage = async (req,res) =>{
    

    try{
        const {pages,limit}= req.query
        
        const totalImages = await ImageModel.countDocuments();
        const images = await ImageModel.find().skip((pages-1)*limit).limit(limit).sort({createdAt:-1})

        const data = {
            images,
            totalPages:Math.ceil(totalImages/limit),
            currentPage:pages
        }
        res.status(200).json(data)
    }catch(e){
        res.status(400).json({message:"something went wrong "})
    }
}

module.exports = { imageCart, getImage };