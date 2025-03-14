const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    userName: String,
    userPhone: String,
    problem: String,
    distance: String,
    mechanicId: String, // Assigned mechanic's ID
    mechanicName: String,
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Request", RequestSchema);