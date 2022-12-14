import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

//Set up for BackEnd and Database
const app = express();

dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));

app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use(cors());

app.use('/posts',postRoutes);
//connect to MongoDB

app.get('/',(req,res) => {
    res.send('Your Photograms');
});

//Setting Up the port 
const PORT = process.env.PORT ||5000;


//setting up to test the connection to localhost
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser : true,useUnifiedTopology:true}).then(() => app.listen(PORT,() => console.log( PORT))).catch((error)=>console.log(error.message));

// mongoose.set("useFindAndModify",false);

