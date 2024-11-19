import { config } from 'dotenv';

import express from 'express';
import app from './app.js';
import userRouter from './routes/userRoutes.js';
import connectToDb from './config/db.js';
import websiteRouter from './routes/websiteRoutes.js';

config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/ping',(req,res) => {
   return res.send({message:"server is alive"});
})

app.use('/api/v1/user',userRouter);
app.use('/api/v1/website',websiteRouter);


app.listen(PORT,async () => {
    await connectToDb();
    console.log(`server successfully running on ${PORT}`);
    
})