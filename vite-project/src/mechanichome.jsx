import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MechanicHome = () => {
  const [mechanicUsername, setMechanicUsername] = useState("Guest");
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigate = useNavigate();
  const mechanicId = localStorage.getItem("mechanicId");

  useEffect(() => {
    const storedUsername = localStorage.getItem("mechanicUsername");
    if (storedUsername) {
      setMechanicUsername(storedUsername);
    }
  }, []);

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getRequests");
        setRequests(response.data.filter(req => req.status === "Pending"));
        setAcceptedRequests(response.data.filter(req => req.status === "Accepted"));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 3000);
    return () => clearInterval(interval);
  }, []);

  // Accept request function
  const handleAccept = async (requestId) => {
    try {
      await axios.post("http://localhost:3001/acceptRequest", { requestId });

      // Refresh requests after accepting
      const response = await axios.get("http://localhost:3001/getRequests");
      setRequests(response.data.filter(req => req.status === "Pending"));
      setAcceptedRequests(response.data.filter(req => req.status === "Accepted"));

    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mechanicEmail");
    localStorage.removeItem("mechanicUsername");
    navigate("/");
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.username}>🔧 {mechanicUsername}</div>
        <button style={styles.logoutButton} onClick={handleLogout}>Sign Out</button>
      </nav>
      <div className="container">
        <h2 className="text-center">Mechanic Home</h2>

        {/* Incoming Requests Section */}
        <h4>Incoming Requests</h4>
        {requests.length === 0 ? (
          <p>No new requests at the moment.</p>
        ) : (
          <div className="container">
            <ul className="list-group">
            {requests.map((req, index) => (
                <li key={index} className="list-group-item">
                    <p><i class="fa-regular fa-circle-user"></i> <strong>User Name:</strong>  {req.userName || "N/A"}</p>
                    <p>📞 <strong>Phone:</strong>{req.userPhone || "N/A"}</p>
                    <p>📍 <strong>Distance:</strong> {req.distance ? `${req.distance}` : "N/A"}</p>
                    <p><i class="fa-solid fa-gear"></i> <strong>Problem:</strong>{req.problem}</p>
                    <button 
                        className="btn btn-success" 
                        style={{ width: "auto" }} 
                        onClick={() => handleAccept(req._id)}
                    >
                        Accept
                    </button>
                </li>
            ))}
            </ul>
          </div>
        )}

        {/* Accepted Requests Section */}
        <h4 className="mt-4">Accepted Requests</h4>
        {acceptedRequests.length === 0 ? (
          <p>No accepted requests yet.</p>
        ) : (
          <div className="container">
            <ul className="list-group">
            {acceptedRequests.map((req, index) => (
                <li key={index} className="list-group-item">
                    <p> <i class="fa-regular fa-circle-user"></i> <strong>User Name:</strong>{req.userName}</p>
                    <p>📞 <strong>Phone:</strong> {req.userPhone}</p>
                    <p>📍 <strong>Distance:</strong> {req.distance}</p>
                    <p><i class="fa-solid fa-gear"></i> <strong>Problem:</strong> {req.problem}</p>
                    <p>✅ <strong>Status:</strong>  Accepted</p>
                </li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "white",
    fontSize: "18px",
  },
  username: {
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    border: "none",
    color: "white",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default MechanicHome;
