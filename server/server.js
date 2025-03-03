import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ Import Product Routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


export default app;