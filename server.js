require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const appointmentRoutes = require("./src/routes/appointment.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/appointments", appointmentRoutes);

// Server
const PORT = process.env.PORT || 5000;

// Wait for DB connection before accepting requests
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});