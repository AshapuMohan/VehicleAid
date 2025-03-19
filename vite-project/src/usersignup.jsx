import { useState } from "react";
import image1 from "./User Login.jpeg";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserSignup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required.";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format.";
        if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/usersignup`, { username, email, password })
                .then(result => {
                    console.log(result);
                    navigate('/userlogin');
                })
                .catch(err => {
                    if (err.response && err.response.status === 409) {
                        setErrors({ email: "User already exists. Please login." });
                    } else {
                        console.error(err);
                    }
                });
        } else {
            setErrors(formErrors);
        }
    };
    

    return (
        <div className="container text-center" style={{ paddingTop: "30px" }}>
            <div className="row">
                <div className="col">
                    <img className="image1" src={image1} alt="User Signup" />
                </div>
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="signup">
                            <h3>User Signup</h3>
                            <div className="mb-3">
                                <label htmlFor="username"><strong>Username:</strong></label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    autoComplete="off"
                                    name="username"
                                    className={`form-control rounded-0 ${errors.username ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">{errors.username}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email"><strong>Email:</strong></label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    name="email"
                                    className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password"><strong>Password:</strong></label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>
                            <button type="submit" className="btn btn-success w-100 rounded-0">Signup</button>
                        </div>
                    </form>
                    <p>Already have an account?</p>
                    <Link to="/userlogin" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default UserSignup;
