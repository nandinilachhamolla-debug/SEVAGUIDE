const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SEVAGUIDE backend is running successfully!"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "SEVAGUIDE API is working!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`SEVAGUIDE backend running on port ${PORT}`);
});