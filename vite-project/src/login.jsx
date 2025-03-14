import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"

function Login(){
    return (
    <div style={{Height:"100%",margin:"20px"}}>
        <nav className="navbar">
            <div className="container-fluid" style={{padding:"0px"}}>
                <Link to='/' className="navbar-brand" >
                    VehicleAid
                </Link>
            </div>
        </nav>
        <h1>Login</h1>
        <p style={{ fontSize: "1.2rem" }}>
            The VehicleAid Login Page allows users to access their accounts securely
            using their email and password. It features a clean, responsive design with
            options to reset forgotten passwords and links to Privacy Policy and Terms.
            Social login options like Google or Facebook enhance convenience.
        </p>
            <div className='row'>
                <div className='col'>
                    <div className="card" style={{height:"350px",minWidth:"300px",alignItems:"center",gap:"20px"}}>
                        <img
                            src="Mechanic-login.jpeg"
                            alt="Avatar"
                            style={{ height: "300px", width: "200px", objectFit: "contain"}}
                        />
                        <div className="container1">
                            <Link to='/mechaniclogin' className="card-text">
                            Mechanic Login
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="card" style={{height:"350px",minWidth:"300px",alignItems:"center",gap:"20px"}}>
                        <img
                            src="User Login.jpeg"
                            alt="Avatar"
                            style={{ height: "350px", width: "200px", objectFit: "contain" }}
                        />
                        <div className="container1">
                            <Link to='/userlogin' className="card-text">
                            User Login
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col'></div>
                <div className='col'></div>
            </div>
        </div>
    )
}

export default Login