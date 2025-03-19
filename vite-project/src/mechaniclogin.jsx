import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image1 from "./Mechanic-login.jpeg";
import "./signup.css";

function MechanicLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Form validation function
    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            formErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            formErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            formErrors.password = "Password is required.";
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            try {
                const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/mechaniclogin`, { email, password });

                if (result.data.message === "success") {
                    // Store mechanic data in local storage
                    localStorage.setItem("mechanicEmail", result.data.email);
                    localStorage.setItem("mechanicUsername", result.data.username);

                    // Redirect to Mechanic Home Page
                    navigate("/mechanichome");
                } else {
                    setErrors({ general: result.data.message });
                }
            } catch (err) {
                console.error(err);
                setErrors({ general: "An error occurred. Please try again." });
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="container text-center" style={{ paddingTop: "30px" }}>
            <div className="row">
                <div className="col">
                    <img src={image1} className="image1" alt="Mechanic Login" />
                </div>
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="login">
                            <h3>Mechanic Login</h3>
                            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                            <div className="mb-3">
                                <label htmlFor="loginemail"><strong>Email:</strong></label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="loginemail"
                                    autoComplete="off"
                                    className={`form-control rounded-0 ${errors.email ? "is-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginpassword"><strong>Password:</strong></label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="loginpassword"
                                    autoComplete="off"
                                    className={`form-control rounded-0 ${errors.password ? "is-invalid" : ""}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                        </div>
                    </form>
                    <p>Don't have an account?</p>
                    <a href="/mechanicsignup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Signup
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MechanicLogin;
