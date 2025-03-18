import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import styles from "../Styles/AdminRideRequest.module.css";

function AdminRideRequest({ onAcceptRequest, onDenyRequest }) {
  const [key, setKey] = useState("pickups");
  const [pickupRequests, setPickupRequests] = useState([
    {
      id: 1,
      destination: "State Campus",
      time: "8:00 AM",
      user: "John Doe",
      vacancy: 2,
      pickupAddress: "123 Main St, Apartment 4B",
      dropoffAddress: "State Campus, Building A",
    },
    {
      id: 2,
      destination: "DOT Building",
      time: "9:00 AM",
      user: "Jane Smith",
      vacancy: 1,
      pickupAddress: "456 Oak St, Apartment 2C",
      dropoffAddress: "DOT Building, Floor 5",
    },
  ]);

  const [dropoffRequests, setDropoffRequests] = useState([
    {
      id: 3,
      destination: "1 Western Ave",
      time: "5:00 PM",
      user: "Alice Cooper",
      vacancy: 3,
      pickupAddress: "1 Western Ave, Apartment 3A",
      dropoffAddress: "Downtown Office, Suite 401",
    },
    {
      id: 4,
      destination: "78 Central Ave",
      time: "3:00 PM",
      user: "Bob Marley",
      vacancy: 1,
      pickupAddress: "78 Central Ave, Apartment 8D",
      dropoffAddress: "Tech Park, Building B",
    },
  ]);

  const [showDetails, setShowDetails] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({});

  const handleAccept = (requestId, isPickup) => {
    if (isPickup) {
      const acceptedRequest = pickupRequests.find(
        (request) => request.id === requestId
      );
      if (acceptedRequest) {
        onAcceptRequest(acceptedRequest);
        setPickupRequests(
          pickupRequests.filter((request) => request.id !== requestId)
        );
      }
    } else {
      const acceptedRequest = dropoffRequests.find(
        (request) => request.id === requestId
      );
      if (acceptedRequest) {
        onAcceptRequest(acceptedRequest);
        setDropoffRequests(
          dropoffRequests.filter((request) => request.id !== requestId)
        );
      }
    }
  };

  const handleDeny = (requestId, isPickup) => {
    if (isPickup) {
      const deniedRequest = pickupRequests.find(
        (request) => request.id === requestId
      );
      if (deniedRequest) {
        onDenyRequest(deniedRequest);
        setPickupRequests(
          pickupRequests.filter((request) => request.id !== requestId)
        );
      }
    } else {
      const deniedRequest = dropoffRequests.find(
        (request) => request.id === requestId
      );
      if (deniedRequest) {
        onDenyRequest(deniedRequest);
        setDropoffRequests(
          dropoffRequests.filter((request) => request.id !== requestId)
        );
      }
    }
  };

  const showRouteDetails = (request, isPickup) => {
    setCurrentDetails({
      user: request.user,
      time: request.time,
      pickupAddress: isPickup ? request.pickupAddress : request.dropoffAddress,
      dropoffAddress: isPickup ? request.dropoffAddress : request.pickupAddress,
    });
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Admin Services</h1>
      <hr />

      <Tabs
        id="admin-services-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="pickups" title="Pickups">
          <Row className="g-3">
            {pickupRequests.map((request) => (
              <Col md={12} key={request.id}>
                <Card className="p-3 shadow-sm">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Placeholder"
                        className={styles.cardImage}
                      />
                    </Col>

                    <Col xs={6}>
                      <p>
                        <strong>Destination:</strong> {request.destination}
                      </p>
                      <p>
                        <strong>Time:</strong> {request.time}
                      </p>
                      <p>
                        <strong>User:</strong> {request.user}
                      </p>
                      <p>
                        <strong>Vacancy:</strong> {request.vacancy}
                      </p>
                    </Col>

                    <Col xs={3} className="d-flex flex-column align-items-end">
                      <Button
                        variant="link"
                        className="text-decoration-none mb-3"
                        style={{ fontSize: "14px" }}
                        onClick={() => showRouteDetails(request, true)}
                      >
                        Route Details
                      </Button>
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAccept(request.id, true)}
                        >
                          ✓ Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeny(request.id, true)}
                        >
                          ✗ Deny
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="dropoffs" title="Dropoffs">
          <Row className="g-3">
            {dropoffRequests.map((request) => (
              <Col md={12} key={request.id}>
                <Card className="p-3 shadow-sm">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Placeholder"
                        className={styles.cardImage}
                      />
                    </Col>

                    <Col xs={6}>
                      <p>
                        <strong>Destination:</strong> {request.destination}
                      </p>
                      <p>
                        <strong>Time:</strong> {request.time}
                      </p>
                      <p>
                        <strong>User:</strong> {request.user}
                      </p>
                      <p>
                        <strong>Vacancy:</strong> {request.vacancy}
                      </p>
                    </Col>

                    <Col xs={3} className="d-flex flex-column align-items-end">
                      <Button
                        variant="link"
                        className="text-decoration-none mb-3"
                        style={{ fontSize: "14px" }}
                        onClick={() => showRouteDetails(request, false)}
                      >
                        Route Details
                      </Button>
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAccept(request.id, false)}
                        >
                          ✓ Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeny(request.id, false)}
                        >
                          ✗ Deny
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      <p>
        <strong>
          {pickupRequests.length + dropoffRequests.length} in total
        </strong>
      </p>

      {/* Modal for Route Details */}
      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Route Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>User:</strong> {currentDetails.user}
          </p>
          <p>
            <strong>Time:</strong> {currentDetails.time}
          </p>
          <p>
            <strong>Pickup Address:</strong> {currentDetails.pickupAddress}
          </p>
          <p>
            <strong>Dropoff Address:</strong> {currentDetails.dropoffAddress}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminRideRequest;
