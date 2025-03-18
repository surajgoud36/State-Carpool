import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Table,
} from "react-bootstrap";
import styles from "../Styles/ManageDestinations.module.css"; // Importing CSS module
import { AlignHorizontalCenterSharp } from "@mui/icons-material";
function ManageDestinations() {
    const [destinations, setDestinations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDestination, setNewDestination] = useState({
        name: "",
        dropoffTime: "",
        pickupTime: "",
        image: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
        },
    });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in newDestination.address) {
            setNewDestination({
                ...newDestination,
                address: { ...newDestination.address, [name]: value },
            });
        } else {
            setNewDestination({ ...newDestination, [name]: value });
        }
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setNewDestination({ ...newDestination, image: imageUrl });
    };
    const handleSave = () => {
        if (editMode) {
            setDestinations(
                destinations.map((dest) =>
                    dest.id
                        === editId ? { ...newDestination, id: editId } : dest
                )
            );
        } else {
            setDestinations([
                ...destinations,
                { ...newDestination, id: destinations.length + 1 },
            ]);
        }
        setShowModal(false);
        resetForm();
    };
    const handleEdit = (id) => {
        const destToEdit = destinations.find((dest) =>
            dest.id
            === id);
        setNewDestination(destToEdit);
        setEditMode(true);
        setEditId(id);
        setShowModal(true);
    };
    const handleDelete = (id) => {
        setDestinations(destinations.filter((dest) =>
            dest.id
            !== id));
    };
    const resetForm = () => {
        setNewDestination({
            name: "",
            dropoffTime: "",
            pickupTime: "",
            image: "",
            address: {
                street: "",
                city: "",
                state: "",
                zipCode: "",
            },
        });
        setEditMode(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/destinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destinations),
            
        })
        .then(response => response.json())
        .then(data => {
            //Handle success
            console.log('Successful Destination Creation',destinations);
        })
        .catch((error) => {
            //Handle error
            console.log("Error: ", error)
        });
    };
    return (
        <Container className={styles.container}>
            {/* Header Section */}
            <Row className={styles.headerRow}>
                <Col>
                    <h1>Manage Destinations</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => setShowModal(true)}>+ Add Destination</Button>
                </Col>
            </Row>
            {/* Destination Table */}
            <Row>
                <Col>
                    <Table striped bordered hover className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Dropoff Time</th>
                                <th>Pickup Time</th>
                                <th>Image</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.map((dest) => (
                                <tr key={
                                    dest.id
                                }>
                                    <td>{dest.name}</td>
                                    <td>{dest.dropoffTime}</td>
                                    <td>{dest.pickupTime}</td>
                                    <td>
                                        <img
                                            src={dest.image}
                                            alt="Destination"
                                            className={styles.tableImage}
                                        />
                                    </td>
                                    <td>
                                        {`${dest.address.street}, ${dest.address.city}, ${dest.address.state} ${dest.address.zipCode}`}
                                    </td>
                                    <td className={styles.actionButtons}>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleEdit(
                                                dest.id
                                            )}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(
                                                dest.id
                                            )}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* Modal for Adding/Editing Destinations */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? "Edit Destination" : "Add Destination"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className={styles.modalForm}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newDestination.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dropoff Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="dropoffTime"
                                value={newDestination.dropoffTime}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pickup Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="pickupTime"
                                value={newDestination.pickupTime}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {newDestination.image && (
                                <img
                                    src={newDestination.image}
                                    alt="Preview"
                                    className={styles.imagePreview}
                                />
                            )}
                        </Form.Group>
                        <Form.Group>
                            <p>Dropoff Address:</p>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                name="street"
                                value={newDestination.address.street}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={newDestination.address.city}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={newDestination.address.state}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="zipCode"
                                value={newDestination.address.zipCode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default ManageDestinations;