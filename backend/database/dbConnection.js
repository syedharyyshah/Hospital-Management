import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose 
    .connect(process.env.MONGO_URI, {
        dbName:"Hospital-Management"
    })
    .then(() => {
        console.log("Connected to database successfully.")
    })
    .catch((err) => {
        console.log(`Failed to connect database: ${err}`)
    });
};