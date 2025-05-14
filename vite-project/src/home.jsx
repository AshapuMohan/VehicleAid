import React from 'react'
import {Link} from "react-router-dom"
import "./style.css"

function Home() {
    return(
        <>
        <nav className="navbar">
            <div className="row" style={{padding:"0px 0px",maxWidth:"100%"}}>
                <div className='col'>
                    <div className="logo" href="#home" style={{ color: "cadetblue",paddingLeft:"10px" }}>
                        <a><i className="fa-solid fa-wrench" style={{ fontSize: "1.5rem" }} /></a>
                        <h2 className="logo-name"><a>VehicleAid</a></h2>
                    </div>
                </div>
                <div className='col'>
                    <ul className="menu-items">
                        <li><a href="#home" style={{ paddingRight: "1.5rem" }}><i className="fa-solid fa-house" />Home</a></li>
                        <li><a href="#about" style={{ paddingRight: "1.5rem" }}><i className="fa-solid fa-address-card" />About Us</a></li>
                        <li><a href="#services" style={{ paddingRight: "1.5rem" }}><i className="fa-solid fa-screwdriver-wrench" />Services</a></li>
                        <li><Link to='/login'  style={{ paddingRight: "1.5rem" }}><i className="fa-solid fa-user" />Login</Link></li>
                        <li><Link to='/signup' style={{ paddingRight: "1.5rem" }}><i className="fa-solid fa-user-plus" />Sign Up</Link></li>
                        <li><a href="#contact"><i className="fa-solid fa-phone" />Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <section className="showcase-area" id="showcase">
            <div className="showcase-container" style={{ display: 'flex', flexDirection: 'column', height: '65vh' }}>
                <div className='showcase-heading' style={{ flex: '0 0 auto' }}>
                    <h1
                        className="main-title"
                        id="home"
                        style={{
                            color: "whitesmoke",
                            fontFamily: "Oswald",
                            textTransform: "uppercase",
                            fontWeight: "bolder",
                            fontSize: "1.6rem",
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingRight:"15px"
                        }}>
                        Your Trusted Companion on the Road
                    </h1>
                </div>
                <div className='showcase-container-bottom' style={{ flex: '1 0 auto', display: 'flex', alignItems: 'flex-end' }}>
                    <div className='showcase-theme'>
                        <p style={{
                            color: "white",
                            fontFamily: "Inter",
                            fontWeight: "bolder",
                            fontSize: "1.5rem",
                            rowGap: "10",
                            display: "flex"
                        }}>
                            Stranded on the road? Don’t worry—we’ve got your back! With
                            vehicleAid, help is just a tap away. From flat tires to engine
                            hiccups, our trusted mechanics are on their way to get you moving
                            again. No hidden charges, no stress—just reliable, 24/7 assistance
                            wherever you are. Hit the road with confidence, knowing vehicleAid is
                            your ultimate travel buddy! 🚗✨
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id="about">
            <div className="about-wrapper">
                <div className='row'>
                    <div className='col'>
                        <p className="small">About Us</p>
                        <h1 style={{ fontSize: "2rem" }}>Why Choose vehicleAid?</h1>
                        <h3>“Revolutionizing Roadside Assistance – Here's What Makes Us Stand Out!”</h3>
                        <p style={{ fontSize: "1.3rem" }}>
                            All mechanics in our network are verified and approved to ensure
                            top-quality service. Each professional undergoes a thorough background
                            check and continuous performance monitoring.
                        </p>
                        <li style={{ fontSize: "1.3rem" }}>Small trust badges like "Verified" or "Certified Mechanics</li>
                        <li style={{ fontSize: "1.3rem" }}>Include a small testimonial or rating system.</li>
                    </div>
                    <div className='col'>
                        <div className="about-img">
                            <img src="/about.jpeg" style={{ height: "500px",borderRadius:"10px" }}/>
                        </div>
                    </div>
                </div>
            </div>     
        </section>
        <section id="services" className="justify-content-center">
            <div className="services-wrapper">
                <p className="small">Services</p>
                <div className="text-center">
                    <div className="row" style={{ background: "#f5f5f7" }}>
                        <div className="col">
                            <div className="card">
                                <h4 className="card-header">Roadside Assistance</h4>
                                <ol>
                                    <li>
                                    <img src="/Towing.jpg" className="img-fluid rounded" />
                                    Towing
                                    </li>
                                    <li>
                                    <img src="/Flat-Tyre.jpg" className="img-fluid rounded" />
                                    Flat-Tyre
                                    </li>
                                    <li>
                                    <img
                                        src="Battery-Jumpstart.jpg"
                                        className="img-fluid rounded"
                                    />
                                    Battery-Jumpstart
                                    </li>
                                    <li>
                                    <img
                                        src="/Startingproblem.jpg"
                                        className="img-fluid rounded"
                                    />
                                    Starting Problem
                                    </li>
                                    <li>
                                    <img src="/Key-Unlock.jpg" />
                                    Key-Unlock-Assistance
                                    </li>
                                    <li>
                                    <img src="/Fuel-Delivery.jpg" className="img-fluid rounded" />
                                    Fuel-Delivery
                                    </li>
                                    <li>
                                    <img src="/Minor-Mechanical-Repairs.jpg" />
                                    Minor Mechanic Repairs
                                    </li>
                                    <li>
                                    <img src="/Car Inspection.jpg" />
                                    Car Inspection
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <footer id="contact">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <h3>VehicleAid</h3>
                            <p>24/7 vehicle care and roadside assistance partner for bikes cars across India</p>
                        </div>
                        <div className="col">
                            <h3>Reach Us</h3>
                            <p><i className="fa-solid fa-phone" />7989909756</p>
                        </div>
                        <div className="col">
                            <h3>Email</h3>
                            <p>ashapumohan123@gmail.com</p>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: "center", fontSize: "1.2rem", paddingBottom: 20 }}>© 2024 VehicleAid, Inc. All rights reserved.</p>
            </footer>
        </section>
        </>
    )
}

export default Home;
