const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/appointments/create", (req, res) => {
    console.log("BODY:", JSON.stringify(req.body));
    res.json({ success: true, body: req.body });
});

app.listen(5001, () => console.log("Test server on 5001"));
