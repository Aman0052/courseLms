const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const dbConnect = require("./config/database");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database Connection
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
	  origin: '*', // Allow all origins
	  credentials: true,
	})
  );
  


// Logging Middleware (Optional, for Debugging)
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary Connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Default Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// Error Handling Middleware (for CORS and Other Errors)
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error(err.stack); // Log other errors for debugging
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
