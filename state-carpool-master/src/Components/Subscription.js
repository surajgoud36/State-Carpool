import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Styles from '../Styles/Subscription.module.css'; 
import { useUser } from "./UserContext";

function Subscription() {
    const navigate = useNavigate();
    const { user, updateUser } = useUser(null);
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardType, setCardType] = useState("credit");
    const [billingInfo, setBillingInfo] = useState({
        street: "",
        city: "",
        state: "",
        zip: ""
    });
    const [autoPay, setAutoPay] = useState(false);
    
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({
            ...billingInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Subscription Info:", {
            cardNumber,
            cvv,
            cardType,
            billingInfo,
            autoPay
        });
        console.log(user.subscription)

        let nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth()+1);
        
        async function postSubscription() {
            const requestBody = {
                autoPayEnabled: autoPay,
                endDate: nextMonth.toLocaleDateString(),
                riderId: user.id
            }
        
            try {
                const headers = { 'Content-Type': 'application/json'}
                const response = await fetch(`http://localhost:8080/users/${user.id}/subscribe`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
                const data = await response.json();
                console.log("Successfully created subscription: " + data);

                updateUser(data);
                navigate('/riderhome');
            }
            catch(error) {
                console.log("Error: " + error);
            }
        }

        async function putSubscription() {
            const requestBody = {
                autoPayEnabled: autoPay,
                endDate: nextMonth.toLocaleDateString(),
                riderId: user.id
            }
            console.log(requestBody)
            try {
                const headers = { 'Content-Type': 'application/json'}
                const response = await fetch(`http://localhost:8080/users/${user.id}/renewsubscription`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
    
                if(response.ok) {
                  const data = await response.json();
                  console.log("Successfully updated subscription: " + data);

                  updateUser(data);
                  navigate('/riderhome');
                }
            }
            catch(error) {
                console.log("Error: " + error);
            }
          }

        if(user.subscription) {
            // Renew
            putSubscription();
        }
        else {
            // Make a new one
            postSubscription();
        }
        alert("Subscription successful!");
    };

    return (
        <Container className={Styles.subscriptionContainer}>
            <Row className="justify-content-center">
                <Col xs={20} md={18} lg={16}>
                    <div className={Styles.formCard}>
                        <h2 className="text-center mb-4">Subscription Checkout</h2>
                        <h5 className="text-center mb-3">$10.99/month</h5>
                        <div className={Styles.paymentMethods}>
                            <h6>Accepted Payment Methods:</h6>
                            <img src="payment_types.png" alt="Accepted Payment Methods" className={Styles.cardIcon}/>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Card Number"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <Row className="mb-3">
                                <Col xs={6}>
                                    <label htmlFor="cvv" className="form-label">CVV*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter CVV"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col xs={6}>
                                    <label htmlFor="cardType" className="form-label">Card Type*</label>
                                    <select
                                        className="form-select"
                                        value={cardType}
                                        onChange={(e) => setCardType(e.target.value)}
                                        required
                                    >
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </select>
                                </Col>
                            </Row>
                            <h5 className="mt-4">Billing Information</h5>
                            <Row className="mb-3">
                                <Col>
                                    <label htmlFor="street" className="form-label">Street Address*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="street"
                                        value={billingInfo.street}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={6}>
                                    <label htmlFor="city" className="form-label">City*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={billingInfo.city}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Col>
                                <Col xs={4}>
                                    <label htmlFor="state" className="form-label">State*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        value={billingInfo.state}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Col>
                                <Col xs={2}>
                                    <label htmlFor="zip" className="form-label">Zip*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="zip"
                                        value={billingInfo.zip}
                                        onChange={handleBillingChange}
                                        required
                                    />
                                </Col>
                            </Row>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={autoPay}
                                    onChange={() => setAutoPay(!autoPay)}
                                />
                                <label className="form-check-label">Enable AutoPay</label>
                            </div>
                            <h5 className="text-center mb-3">Total: $10.99</h5>
                            <button type="submit" className="btn btn-outline-dark w-100">Checkout</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Subscription;