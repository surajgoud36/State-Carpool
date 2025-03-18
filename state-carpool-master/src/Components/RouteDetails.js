import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
/*import Styles from "../Styles/RouteDetails.module.css";*/
import "../Styles/RouteDetails.css";
import Image from "react-bootstrap/Image";
function RouteDetails() {
  return (
    <>
      <Container className="d-flex align-items-center">
        <Col className="col-lg-5 col-md-5">
          <h4></h4>
        </Col>
        <Col className="col-lg-5">
          <h4>Route Detials</h4>
        </Col>
        <Col className="col-lg-3">
          <Button variant="outline-primary" className="small-button">
            edit
          </Button>
          <i class="bi bi-save-fill icon-margin"></i>
        </Col>
      </Container>
      <div className="line"></div>
      <Container className="container">
        <Row className="">
          <Col class="offset-1" lg={3} md={3}>
            <Image
              className="image"
              src="https://lh3.googleusercontent.com/p/AF1QipPKDYeuJvTDpJB-V1-O2rkAfPPi-5cmroESk4BS=s680-w680-h510"
              rounded
            />
          </Col>

          <Col>
            
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RouteDetails;
