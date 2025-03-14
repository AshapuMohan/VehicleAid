const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static HTML files

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Prediction route
app.post("/predict", (req, res) => {
    const { internal_marks, internal_percentage, total_marks, model } = req.body;
    
    const pythonProcess = spawn("python3", ["predict.py", internal_marks, internal_percentage, total_marks, model]);
    
    pythonProcess.stdout.on("data", (data) => {
        const output = data.toString().split("\n");
        const performance = output[0];
        const csvFilePath = output[1].replace("CSV Report saved: ", "").trim();

        res.send(`
            <h2>Predicted Performance: ${performance}</h2>
            <a href="/${csvFilePath}" download>Download Report (CSV)</a>
        `);
    });
    
    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
        res.status(500).send("Error processing prediction");
    });
});

// Serve generated CSV reports
app.use("/student_report.csv", (req, res) => {
    res.download("student_report.csv");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});