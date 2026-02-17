import express from "express";
import dotenv from "dotenv";
import connnectDB from "./config/db.js";
import authRoute from "./Routes/auth.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
const PORT = process.env.PORT || 5000;
const apple = "apple";
app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
    connnectDB();
});
