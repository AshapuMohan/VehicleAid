const mongoose = require("mongoose");

const MechanicSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    acceptedCustomers: { type: Array, default: [] }  // <-- Added this field
});

const MechanicModel = mongoose.model("Mechanic", MechanicSchema);
module.exports = MechanicModel;
