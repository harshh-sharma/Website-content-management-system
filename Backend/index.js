import { config } from 'dotenv';

import express from 'express';
import app from './app.js';
import connectToDb from './config/db.js';

config();

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT,async () => {
    await connectToDb();
    console.log(`server successfully running on ${PORT}`);
    
})