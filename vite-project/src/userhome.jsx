import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Modal, Button, Form } from "react-bootstrap";
import MechanicSearch from './searchinput';

const UserHome = () => {
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [userDetails, setUserDetails] = useState({
      username: "",
      phone: "",
      problem: "",
      distance: "",
  });
  const mechanics = [
    { name: "Ravi Automobiles", phone: "8985384993", distance: "3.1km",rating:"4.0" },
    { name: "Shirdi Sai Auto Mobiles", phone: "9848367662", distance: "8.7km",rating:"4.4" },
    { name: "SAI CAR CARE", phone: "9985784593", distance: "7.5km",rating:"5.0" },
    { name: "Sri Sai Durga Auto Works", phone: "9395307055", distance: "6.2km",rating:"4.5" },
    { name:"SHREE HARI AUTOMOTIVE", phone:"7013774257", distance:"7.7km",rating:"4.3"},
    { name:"A1 CAR CARE", phone:"9550232721", distance:"7.6km",rating:"4.4"},
    { name:"Vishna Mechanic", phone:"9948521253", distance:"7.6km",rating:"No Review"}
  ];
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/getMechanics")
        .then(response => setMechanics(response.data))
        .catch(error => console.error("Error fetching mechanics:", error));

    axios.get("http://localhost:3001/getAcceptedRequests")
        .then(response => setAcceptedRequests(response.data))
        .catch(error => console.error("Error fetching accepted requests:", error));
}, []);
const handleSearch = async () => {
    if (!userLocation) return;
    try {
      const response = await axios.get(`http://localhost:3001/mechanics?lat=${userLocation.lat}&lng=${userLocation.lng}`);
      setMechanics(response.data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
};
const handleRequestClick = (mechanic) => {
  setSelectedMechanic(mechanic);
  setModalIsOpen(true);
};
// map click
const handleMarkerClick = (mechanic) => {
  setSelectedMechanic(mechanic);
};
const handleMapClick = (e) => {
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  setUserLocation({ lat, lng });
  if (mapRef.current) mapRef.current.panTo({ lat, lng });
};
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }
}, []);



// sending requset to mechanic
const handleSubmitRequest = () => {
  axios.post("http://localhost:3001/sendRequest", {
      userName: userDetails.userName,
      userPhone: userDetails.userPhone,
      problem: userDetails.problem,
      distance: selectedMechanic.distance ?? "N/A",  
      mechanicId: selectedMechanic._id,
      mechanicName: selectedMechanic.name
  })
  .then(response => {
      alert("Request sent successfully!");
      setModalIsOpen(false);
  })
  .catch(error => console.error("Error sending request:", error));
};

//get request
useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getRequests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  fetchRequests();
  const interval = setInterval(fetchRequests, 3000);
  return () => clearInterval(interval);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="main" style={{height:"auto"}}>
    <nav style={styles.navbar}>
      <div style={styles.username}>👤 {username}</div>
      <button style={styles.logoutButton} onClick={handleLogout}>Sign Out</button>
    </nav>
    <div style={{ textAlign: "center", margin: "20px" ,height:"auto" }}>
      < MechanicSearch />
    </div>
    <div className="container">
            <GoogleMap
              center={{ lat: 18.0603378, lng: 83.4033303 }}
              zoom={15}
              mapContainerStyle={{ height: "400px", width: "100%" }}
              onClick={handleMapClick}
            >
              {userLocation && <Marker position={userLocation} label="You" />}
              {mechanics.map((mechanic) => (
                <Marker key={mechanic._id} position={{ lat: mechanic.lat, lng: mechanic.lng }} label="M" onClick={() => handleMarkerClick(mechanic)} />
              ))}
            </GoogleMap>
            <h2 style={{margin:"15px"}} className="text-center">User Home</h2>
            <h2 style={{margin:"15px"}}>Nearby Mechanics :</h2>
            <ul className="list-group">
                {mechanics.map((mechanic, index) => (
                    <li key={index} className="list-group-item">
                        <p>🏢 <strong>Mechanic Name:</strong> {mechanic.name}</p>
                        <p>📞 <strong>Phone:</strong> {mechanic.phone}</p>
                        <p>📍 <strong>Distance:</strong> {mechanic.distance}</p>
                        <p>⭐ <strong>Rating:</strong> {mechanic.rating}</p>
                        <button className="btn btn-primary" style={{width:"auto"}} onClick={() => handleRequestClick(mechanic)}>
                            Request
                        </button>
                    </li>
                ))}
            </ul>
            <h3 style={{margin:"15px"}}>Accepted Requests :</h3>
            {acceptedRequests.length === 0 ? (
                <p>No requests accepted yet.</p>
            ) : (
                acceptedRequests.map((req, index) => (
                  <div className="card" style={{marginBottom:"20px",padding:"10px",width:"100%",backgroundColor:"white"}}>
                    <div key={index} style={{padding:"5px"}} className="accepted-request">
                      <p>🏢 <strong>Mechanic:</strong> {req.mechanicName}</p>
                      <p><i class="fa-solid fa-gear"></i> <strong>Problem:</strong> {req.problem}</p>
                      <p>✅ <strong>Status:</strong> {req.status}</p>
                    </div>
                  </div>
                ))
            )}
            {/* Modal for Request Form */}
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Request Assistance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={userDetails.userName}
                                onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={userDetails.userPhone}
                                onChange={(e) => setUserDetails({ ...userDetails, userPhone: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="problem">
                            <Form.Label>Problem</Form.Label>
                            <Form.Control
                                as="select"
                                value={userDetails.problem}
                                onChange={(e) => setUserDetails({ ...userDetails, problem: e.target.value })}
                                required
                            >
                                <option value="">Select a problem</option>
                                <option value="Towing">Towing</option>
                                <option value="Flat-Tyre">Flat-Tyre</option>
                                <option value="Battery-Jumpstart">Battery-Jumpstart</option>
                                <option value="Starting Problem">Starting Problem</option>
                                <option value="Key-Unlock-Assistance">Key-Unlock-Assistance</option>
                                <option value="Fuel-Delivery">Fuel-Delivery</option>
                                <option value="Minor Mechanic Repairs">Minor Mechanic Repairs</option>
                                <option value="Car Inspection">Car Inspection</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="distance">
                            <Form.Label>Distance</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedMechanic ? selectedMechanic.distance : `${userDetails.distance}`}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{width:"auto"}} onClick={handleSubmitRequest}>Submit Request</Button>
                    <Button variant="danger" style={{width:"auto"}} onClick={() => setModalIsOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
  </div>
  );
};

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

export default UserHome;
