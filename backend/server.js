// ALL IMPORTS HERE
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import AuthRoute from './src/route/AuthRoute.js';
import CarRoute from '../backend/src/route/CarRoute.js';
import SearchRoute from '../backend/src/route/SearchRoute.js';
import ConnectDB from './src/db/ConnectDB.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

console.log("DEBUG: Your DB URI is ->", process.env.MONGOOSE_URI);

// 1. FIXED CORS CONFIGURATION
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "https://car-advisor-website.vercel.app",     // ADDED: Your actual live frontend
            "https://car-advisor-website-1.onrender.com",   // Your live backend
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5000"
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost:")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

// 2. ROUTES SETUP
app.use('/api/auth', AuthRoute);
app.use('/api/cars', CarRoute);
app.use('/api/search', SearchRoute);

// 3. SECURE DATABASE ASYNC WRAPPER
const startServer = async () => {
    try {
        // Force the app to wait for MongoDB Atlas to say "Connected"
        await ConnectDB(); 
        
        // Only open the ports once the database is 100% ready
        app.listen(PORT, () => {
            console.log(`The SERVER IS RUNNING ON ${PORT}`);
        });
    } catch (error) {
        console.error("CRITICAL: Failed to start server due to DB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();