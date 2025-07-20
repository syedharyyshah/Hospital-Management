import express from "express";
import {config} from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"

const app = express();
config({path:"./config/.env"});

app.use(
    cors({
        origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    }) 
    );


app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/appointment",appointmentRouter)


// Basic health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: "active", // More standard terminology
        error: false,
        message: "Server is running",
        timestamp: new Date().toISOString() // Added timestamp for monitoring
    });
});

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: "Route not found"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: "Internal server error"
    });
});

 

dbConnection();    

app.use(errorMiddleware)
export default app;
