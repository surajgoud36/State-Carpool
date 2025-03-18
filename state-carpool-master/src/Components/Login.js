import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Styles from '../Styles/Login.module.css';
import { useUser } from '../Components/UserContext'; 

function LoginForm() {
    const { updateUser, updateRole } = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };
        try {
            const response = await fetch(`http://localhost:8080/users/login`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData)
            });

            console.log("Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }
            const jsonResponse = await response.json();
            //console.log(jsonResponse.success);
            localStorage.setItem('user', JSON.stringify(jsonResponse.user));
            localStorage.setItem('role', JSON.stringify(formData.role));
            if (jsonResponse.success) {
                if (formData.role === "ROLE_RIDER"){
                    updateRole(formData.role);
                    navigate('/riderhome');
                } else if (formData.role === "ROLE_ADMIN"){
                    updateRole(formData.role);
                    navigate('/adminhome');
                } else if(formData.role === "ROLE_DRIVER") {
                    updateRole(formData.role);
                    navigate('/currentRide');
                }else {
                    updateRole(null);
                    navigate("/");
                }
                updateUser(jsonResponse.user);
            } else {
                setError("Invalid credentials.");
            }
        } catch (error) {
            console.error("Error:",error);
            setError("An error occured while logging in. Please try again.");
        }
    };
    return (
        <Container className={Styles.loginContainer}>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12}>
                    <div className={Styles.formCard}>
                        <h2 className="text-center mb-4">Login</h2>
                        {error && (
                            <div className="alert alert-danger text-center">
                                {error}
                                </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email*</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role*</label>
                                <select
                                    name="role"
                                    id="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="ROLE_RIDER">Rider</option>
                                    <option value="ROLE_DRIVER">Driver</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-outline-dark w-100">Login</button>
                        </form>
                        <div className="text-center mt-2">
                            <a href="/signup" className="small" onClick={() => navigate('/signup')}>Create Account</a>
                        </div>
                        <div className="text-center mt-1">
                            <a href="/" className="small" onClick={() => {}}>Forgot Password?</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
