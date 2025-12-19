require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRouter = require("./Routers/signuprouter");
const loginRouter = require("./Routers/loginrouter");
const adminRoutes = require("./Routers/adminRoutes");

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite frontend
    "http://localhost:3000", // optional (React CRA)
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/user", signupRouter);
app.use("/api/user", loginRouter);
app.use("/api/admin", adminRoutes);

// Environment validation
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL environment variable is required");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET environment variable is required");
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));