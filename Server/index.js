const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { cloudinaryConnect } = require("./config/cloudinary");
const dbConnect = require("./config/database");

// Import Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database Connection
dbConnect();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://course-lms-beta.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorisation", "X-Requested-With", "Accept","Authorization"], 
  credentials: true,
};

app.use(cors(corsOptions));

// Ensure Preflight (OPTIONS) Requests Are Handled
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorisation, X-Requested-With, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { fileSize: 50 * 1024 * 1024 }, 
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    res.status(504).json({ success: false, message: "Request Timeout" });
  });
  next();
});


app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
