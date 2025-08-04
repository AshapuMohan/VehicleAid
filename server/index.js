const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const MechanicModel = require("./models/Mechanic");
const RequestModel = require("./models/Request"); // ✅ Add this at the top

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Atlas connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// mongoose.connect("mongodb+srv://ashapumohan123:Mohan%401981@mohan.i5gtq.mongodb.net/vehicleaid?retryWrites=true&w=majority/vehicleaid", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error(err));

// signup
app.post("/usersignup", (req, res) => {
    const { username, email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                res.status(409).json({ message: "User already exists" });
            } else {
                UserModel.create({ username, email, password })
                    .then(newUser => res.json({ message: "User signup successful", user: newUser }))
                    .catch(err => res.status(500).json({ error: err.message }));
            }
        });
});
app.post("/mechanicsignup", (req, res) => {
    const { username, email, password } = req.body;
    MechanicModel.findOne({ email })
        .then(mechanic => {
            if (mechanic) {
                res.status(409).json({ message: "Mechanic already exists" });
            } else {
                MechanicModel.create({ username, email, password })
                    .then(newMechanic => res.json({ message: "Mechanic signup successful", mechanic: newMechanic }))
                    .catch(err => res.status(500).json({ error: err.message }));
            }
        });
});
// login
app.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.json({ message: "No account found with this email." });
        }
        if (user.password !== password) {
            return res.json({ message: "Incorrect password." });
        }
        res.json({ message: "success", username: user.username, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});


app.post("/mechaniclogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const mechanic = await MechanicModel.findOne({ email: email });
        if (!mechanic) {
            return res.json({ message: "No account found with this email." });
        }
        if (mechanic.password !== password) {
            return res.json({ message: "Incorrect password." });
        }
        res.json({ message: "success", username: mechanic.username, email: mechanic.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Save user request to database
app.post("/sendRequest", async (req, res) => {
    try {
        const { userName, userPhone, problem, distance, mechanicId, mechanicName } = req.body;

        const newRequest = new RequestModel({
            userName,  // Ensure this is being saved
            userPhone, // Ensure this is being saved
            problem,
            distance,  // Ensure this is being saved
            mechanicId,
            mechanicName,
            status: "Pending"
        });
        await newRequest.save();
        res.json({ message: "Request sent successfully" });
    } catch (error) {
        console.error("Error saving request:", error);
        res.status(500).json({ error: "Server error while saving request" });
    }
});

// Get all requests for mechanics
app.get("/getRequests", async (req, res) => {
    try {
        const requests = await RequestModel.find({});
        res.json(requests.map(req => ({
            ...req._doc,
            distance: req.distance || "N/A"  // ✅ Ensures distance is always set
        })));
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ error: "Server error while fetching requests" });
    }
});




// Accept request

app.post("/acceptRequest", async (req, res) => {
    const { requestId } = req.body;

    try {
        const request = await RequestModel.findById(requestId);
        if (!request) return res.status(404).json({ message: "Request not found" });

        request.status = "Accepted";
        await request.save();
        res.json({ message: "Request accepted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/getAcceptedRequests", async (req, res) => {
    try {
        const acceptedRequests = await RequestModel.find({ status: "Accepted" });
        res.json(acceptedRequests);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
