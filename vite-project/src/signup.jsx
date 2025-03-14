import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

function Signup(){
    return (
    <div style={{Height:"100%",margin:"20px"}}>
        <nav className="navbar">
            <div className="container-fluid" style={{padding:"0px"}}>
                <Link to='/' className="navbar-brand">
                    VehicleAid
                </Link>
            </div>
        </nav>
        <h1>Signup</h1>
        <p style={{ fontSize: "1.2rem" }}>
            The VehicleAid Signup Page enables users to register quickly with fields for
            personal and vehicle details, ensuring secure input handling and validation.
            It features a clean, responsive design with easy navigation and links to
            Privacy Policy and Terms. Users can sign up via email or through social
            platforms for added convenience.
        </p>
        <div className='row'>
            <div className='col'>
                <div className="card"  style={{height:"350px",minWidth:"300px",alignItems:"center",gap:"20px"}}>
                    <img
                        src="Mechanic-login.jpeg"
                        alt="Avatar"
                        style={{ height: "300px", width: "200px", objectFit: "contain" }}
                    />
                    <div className="container1">
                        <Link to='/mechanicsignup' className="card-text">
                        Mechanic Signup
                        </Link>
                    </div>
                </div>
            </div>
            <div className='col'>
                <div className="card"  style={{height:"350px",minWidth:"300px",alignItems:"center",gap:"20px"}}>
                    <img
                        src="User Login.jpeg"
                        alt="Avatar"
                        style={{ height: "350px", width: "200px", objectFit: "contain" }}
                    />
                    <div className="container1">
                        <Link to='/usersignup' className="card-text">
                        User Signup
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

export default Signup