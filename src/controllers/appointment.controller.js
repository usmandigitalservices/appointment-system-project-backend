const Appointment = require("../models/appointment.model");

// ➕ CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
    try {
        const { customer_name, date, time, day } = req.body;

        // ✅ Validation
        if (!customer_name || !date || !time || !day) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newAppointment = new Appointment({
            customer_name,
            date,
            time,
            day,
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: "Appointment Created",
            data: newAppointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 📥 GET ALL APPOINTMENTS (with optional filtering)
exports.getAppointments = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};

        if (status) {
            filter.status = status;
        }

        const appointments = await Appointment.find(filter).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            results: appointments.length,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 🔍 GET SINGLE APPOINTMENT (optional but useful)
exports.getSingleAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✏️ UPDATE APPOINTMENT (user can edit details)
exports.updateAppointment = async (req, res) => {
    try {
        const { customer_name, date, time, day } = req.body;

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { customer_name, date, time, day },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment Updated",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ❌ DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment Deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ ADMIN: UPDATE STATUS (accept / reject)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // ✅ Only allow specific values
        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be 'accepted' or 'rejected'",
            });
        }

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Appointment ${status}`,
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};