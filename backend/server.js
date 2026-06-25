//ALL IMPORTS HERE
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import AuthRoute from './src/route/AuthRoute.js';
import CarRoute from '../backend/src/route/CarRoute.js'
import SearchRoute from '../backend/src/route/SearchRoute.js'
import { Import } from 'lucide-react';
import ConnectDB from './src/db/ConnectDB.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;




//MIDDLEWARES
app.use(cors());
app.use(express.json());

//DB CONNECTION
ConnectDB();
//ROUTES
app.use('/api/auth' , AuthRoute);
app.use('/api/cars' , CarRoute);
app.use('/api/search' , SearchRoute);


app.listen(PORT , () => {
    console.log(`The SERVER IS RUNNING ON ${ PORT}`)
})