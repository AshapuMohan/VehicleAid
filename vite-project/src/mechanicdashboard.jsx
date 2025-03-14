import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MechanicDashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/requests')
            .then(res => setRequests(res.data.filter(req => req.status === 'pending')))
            .catch(err => console.error(err));
    }, []);

    const handleAccept = (id) => {
        axios.put(`/api/requests/accept/${id}`, { mechanicId: 'mechanic123' })
            .then(res => setRequests(requests.map(req => req._id === id ? res.data : req)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Mechanic Dashboard</h1>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.userName} - {request.problemDescription}
                        <button onClick={() => handleAccept(request._id)}>Accept</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MechanicDashboard;
