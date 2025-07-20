import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

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

// Error handling middlewareeee
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: "Internal server error"
    });
})

export default app;
// No app.listen() here for Vercel compatibility