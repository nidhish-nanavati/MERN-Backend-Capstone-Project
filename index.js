const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoute = require("./routes/user");

dotenv.config();
app.get('/',(req,res)=>{
    // res.send("Hello World");
    res.sendFile(path.join(__dirname,"public","try.html")); 
});

// Define a health API check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use("/api/user",userRoute);

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
