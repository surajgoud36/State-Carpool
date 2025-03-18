import Styles from '../Styles/LandingPage.module.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

function LandingPage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <Container className={Styles.landingContainer}>
            <Row className="justify-content-center text-center">
                <Col xs={20} md={16} lg={8}>
                    <Image
                        src="workers_smiling.png"
                        alt="Carpool Banner"
                        className={Styles.bannerImage}
                        fluid
                    />
                    <h1 className={Styles.header}>Welcome to State Carpool</h1>
                    <p className={Styles.description}>
                        Join a community of state employees making their daily commute simpler, more sustainable, and stress-free.
                    </p>
                    <p className={Styles.description}>
                        With State Carpool, you can schedule rides to any state agency building, track your vehicle in real-time, and arrive on time, every time.
                    </p>
                    <p className={Styles.description}>
                        Just sign up, subscribe, and start enjoying a smarter way to get to work.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        className={Styles.signUpButton}
                        onClick={handleSignUp}
                    >
                        Sign Up Now
                    </Button>
                    <p><a class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href='/login'>
                        Already have an account?</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;