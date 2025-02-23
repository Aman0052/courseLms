const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { cloudinaryConnect } = require("./config/cloudinary");
const dbConnect = require("./config/database");

// Route imports
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Increase the timeout for the server
const server = express();
server.timeout = 60000; // 60 seconds

// Database Connection with timeout
dbConnect()
console.log('hii')

// CORS configuration
app.use(cors({
    origin: 'https://course-lms-beta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middlewares with increased limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Request timeout middleware
app.use((req, res, next) => {
    res.setTimeout(30000, () => {
        res.status(504).send('Request Timeout');
    });
    next();
});

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
        limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    })
);

// Cloudinary Connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server with proper error handling
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});