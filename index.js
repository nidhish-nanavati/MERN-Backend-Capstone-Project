const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
app.get('/',(req,res)=>{
    // res.send("Hello World");
    res.sendFile(path.join(__dirname,"public","try.html")); 
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected");
    }).catch(error => {
        console.log(error);
    })
})
