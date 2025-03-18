import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Table, Button } from "react-bootstrap";
import styles from "../Styles/AdminRouteDetails.module.css";

function AdminRouteDetails() {
  const [newDestination, setNewDestination] = useState({
    destination: "",
    time: "7:00 AM",
    type: "Pick-Up",
  });
  const [people, setPeople] = useState([
    { id: 1, name: "John Doe", address: "123 Main St" },
    { id: 2, name: "Jane Smith", address: "456 Elm St" },
  ]);
  const [destinations, setDestinations] = useState([
    { id: 1, destination: "Central Park", time: "7:15 AM", type: "Pick-Up" },
    { id: 2, destination: "Times Square", time: "8:00 AM", type: "Drop-Off" },
  ]);

  const timeOptions = Array.from({ length: 12 }, (_, index) => {
    const hour = Math.floor(index / 4) + 7;
    const minute = (index % 4) * 15;
    return `${hour}:${minute.toString().padStart(2, "0")} ${
      hour < 12 ? "AM" : "PM"
    }`;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDestination = () => {
    if (!newDestination.destination) {
      alert("Please enter a destination.");
      return;
    }

    setDestinations((prev) => [
      ...prev,
      { id: prev.length + 1, ...newDestination },
    ]);
    setNewDestination({ destination: "", time: "7:00 AM", type: "Pick-Up" });
  };

  const handleDeleteDestination = (id) => {
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  const handleDeletePerson = (id) => {
    setPeople((prev) => prev.filter((person) => person.id !== id));
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className={styles.routeDetailsHeader}>
            <h4 className={styles.routeDetailsTitle}>Route Details</h4>
          </div>

          <Row className="mt-3">
            <Col md={12}>
              <div className={styles.card}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={newDestination.type}
                        onChange={handleInputChange}
                      >
                        <option>Pick-Up</option>
                        <option>Drop-Off</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Select
                        name="time"
                        value={newDestination.time}
                        onChange={handleInputChange}
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Destination</Form.Label>
                      <Form.Control
                        type="text"
                        name="destination"
                        value={newDestination.destination}
                        onChange={handleInputChange}
                        placeholder="Enter destination"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleAddDestination}
                      style={{ marginTop: "45px" }}
                      className="ml-auto d-block" // Adding ml-auto and d-block to push button right
                    >
                      Add Destination
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <div className={styles.tableContainer}>
            <h5 className={styles.tableTitle}>People</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.address}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePerson(person.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className={styles.tableContainer}>
            <h5 className={styles.tableTitle}>Destinations</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest.id}>
                    <td>{dest.destination}</td>
                    <td>{dest.time}</td>
                    <td>{dest.type}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteDestination(dest.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Google Maps Section */}
        <Col md={4}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ddd",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <p style={{ color: "#666" }}>Google Maps Placeholder</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminRouteDetails;
