class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
        const message = `Duplicate ${field} entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid, try again!";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired, try again!";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle Mongoose validation errors
    const errorMessage = err.errors 
        ? Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : err.message;

    const isDev = process.env.NODE_ENV !== 'production';
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
        stack: err.stack
    });
};

export default ErrorHandler;