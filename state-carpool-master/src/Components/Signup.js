import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Styles from '../Styles/Login.module.css';
import { useUser } from "./UserContext";

function CreateAccountForm() {
    const navigate = useNavigate();
    const { updateUser, updateRole } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        street: "",
        workplace: "",
        city: "",
        state: "",
        zipCode: "",
        firstName: "",
        lastName: "",
    });

    const [errors, setErrors] = useState({
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        const requestData = {
            name: formData.firstName +" "+ formData.lastName,
            email: formData.email,
            password: formData.password,
            workplace: formData.workplace,
            role: formData.role,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode
            }
        };

        setErrors({ confirmPassword: "" });
        console.log(JSON.stringify({requestData}));
           try{
            const response = await fetch("http://localhost:8080/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(requestData),
        });
        console.log("Response Status:", response.status);
        console.log()
        const data = await response.json();
        //console.log("Response Data:", data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('role', JSON.stringify(formData.role));
        if (formData.role === "ROLE_RIDER"){
            updateRole(formData.role);
            navigate('/riderhome');
        } else if (formData.role === "ROLE_ADMIN"){
            updateRole(formData.role);
            navigate('/adminhome');
        } else if(formData.role === "ROLE_DRIVER") {
            updateRole(formData.role);
            navigate('/currentRide');
        }
        updateUser(data);
    } catch (error) {
        console.error('Error', error);
    }
    };

    return (
        <Container className={Styles.loginContainer}>
            <Row className="justify-content-center">
                <Col xs={20} md={16} lg={14}>
                    <div className={Styles.formCard}>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter First Name" 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter Last Name" 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
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
                            <Row>
                                <Col md={6}>
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
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Confirm Password" 
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.confirmPassword && (
                                            <div className="text-danger small">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
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
                                </select>
                            </div>
                                    <div className="mb-3">
                                        <label htmlFor="street" className="form-label">Street Address*</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter Address" 
                                            name="street"
                                            value={formData.street}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="city" className="form-label">City*</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter City" 
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="state" className="form-label">State*</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter State" 
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                            <div className="mb-3">
                                                <label htmlFor="zipCode" className="form-label">Zip Code*</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter Zip Code" 
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="workplace" className="form-label">Workplace*</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="ex: State Campus" 
                                                    name="workplace"
                                                    value={formData.workplace}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                    </Row>
                                    
                            <button type="submit" className="btn btn-outline-dark w-100">Create Account</button>
                        </form>
                        <div className="text-center mt-3">
                            <a href="/login" className="small" onClick={() => navigate('/login')}>Back to Login</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateAccountForm;