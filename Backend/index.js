import { config } from 'dotenv';
import cloudinary from "cloudinary";

import express from 'express';
import app from './app.js';
import connectToDb from './config/db.js';

config();

const PORT = process.env.PORT || 3500;

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT,async () => {
    await connectToDb();
    console.log(`server successfully running on ${PORT}`);
    
})