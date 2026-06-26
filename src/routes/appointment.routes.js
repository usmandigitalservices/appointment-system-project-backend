const express = require("express");
const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment,
    updateStatus,
} = require("../controllers/appointment.controller");

// ➕ Create
router.post("/create", createAppointment);

// 📥 Get all
router.get("/", getAppointments);

// ✅ IMPORTANT: PUT THIS BEFORE "/:id"
router.patch("/:id/status", updateStatus);

// 🔍 Get single
router.get("/:id", getSingleAppointment);

// ✏️ Update
router.put("/:id", updateAppointment);

// ❌ Delete
router.delete("/:id", deleteAppointment);

module.exports = router;