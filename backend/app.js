import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"

const app = express();

// Check for required environment variables at startup
const requiredEnv = [
    'MONGO_URI',
    'JWT_SECRET_KEY',
    'JWT_EXPIRES',
    'COOKIE_EXPIRE',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'FRONTEND_URL',
    'DASHBOARD_URL'
];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.warn('Missing required environment variables:', missingEnv);
}

app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL,
            process.env.DASHBOARD_URL,
            "http://localhost:5173", // local frontend
            "http://localhost:3000", // another common local port
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
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


 

dbConnection();    

app.use(errorMiddleware)
export default app;
