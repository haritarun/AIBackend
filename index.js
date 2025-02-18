require("dotenv").config();
const express = require('express');
const app = express();
const cartRoutes = require('./routes/cartRoutes'); 
app.use(express.json());
const connectDB = require("./config/db.js")
connectDB()

console.log("enter into backend")
app.use('/', cartRoutes);

app.use('/',cartRoutes)

app.get("/",(req,res)=>{
    res.send("welcom to the Login ")
})

app.use('/',cartRoutes)
app.use('/',cartRoutes)


app.listen(3000, () => {
    console.log("Server running at Port 3000");
});
