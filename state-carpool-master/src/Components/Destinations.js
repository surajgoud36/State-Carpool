import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Image, Modal, Table } from "react-bootstrap";
import { Edit, Delete } from "@mui/icons-material";
import { nameFormatter } from "../Functions";
import Styles from '../Styles/Destinations.module.css';

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [show, setShow] = useState(false);
    const [destination, setDestination] = useState(null); // Currently clicked destination
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false); // Used to show the delete destination modal

    const [newDestination, setNewDestination] = useState({
        name: "",
        pickupTime: "",
        dropoffTime: "",
        imageByteArrString: "",
        imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        street: "",
        city: "",
        state: "",
        zipCode: ""
    });

    const [editDestination, setEditDestination] = useState(null);

    const [editImagePreview, setEditImagePreview] = useState("");

    const dropoffTimes = ["6:30 AM", "6:45 AM", "7:00 AM", "7:15 AM", "7:30 AM", "7:45 AM", "8:00 AM", "8:15 AM", "8:30 AM", "8:45 AM", "9:00 AM"];
    const pickupTimes = ["3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM", "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM"];
    
    
    const handleShow = (destination) => {
      setShow(true);
      setDestination(destination);
      setEditImagePreview(destination.image !== null ? `data:image/jpeg;base64,${destination.image}` : "");
    }

    const handleClose = () => {
      setShow(false);
      setDestination(null);
      setEdit(false);
      setEditDestination(null);
      setEditImagePreview("");
    }

    const handleEdit = () => {
      if(edit) {
        setEditDestination(null);
        setEditImagePreview(destination.image !== null ? `data:image/jpeg;base64,${destination.image}` : "");
      }
      setEdit(prev => !prev);
    }

    const handleRemove = () => {
      setRemove(true);
    }

    const closeRemove = () => setRemove(false);

    useEffect(() => {
        async function fetchDestinations() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch('http://localhost:8080/destinations', {headers});
            const data = await response.json();
            setDestinations(data);
        }

        fetchDestinations();
    }, [])

    const handleInputChange = (e) => {
      if(edit) {
        setEditDestination({
          ...editDestination, 
          [e.target.name]: e.target.value,
        });
      }
      else {
        setNewDestination({
            ...newDestination,
            [e.target.name]: e.target.value
        });
      }
    }

    const uploadPhoto = (e) => {
        const file = e.target.files[0];
        
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert the file to a byte array
                const byteArray = new Uint8Array(reader.result);
                const photoByteString = btoa(String.fromCharCode(...new Uint8Array(byteArray)));
                const photoUrl = `data:image/jpeg;base64,${photoByteString}`;
                if(edit) {
                  setEditDestination({
                    ...editDestination, 
                    [e.target.name]: photoByteString,
                  });
                  setEditImagePreview(photoUrl);
                }
                else {
                  setNewDestination({
                    ...newDestination,
                    [e.target.name]: photoByteString,
                    ["imageUrl"]: photoUrl
                  });
                }
            }
            reader.readAsArrayBuffer(file);
        }
       
    }

    const clearInputForm = () => {
      if(edit) {
        setEditDestination(null);
        setEditImagePreview("");
      }
      else {
        setNewDestination({
            name: "",
            pickupTime: "",
            dropoffTime: "",
            imageByteArrString: "",
            imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            street: "",
            city: "",
            state: "",
            zipCode: ""
        })
        document.getElementById("uploadDestinationPhoto").value="";
      }
    }

    // POST Request - New Destination
    const handleAddDestination = () => {
        // Checks for any missing fields
        for(const [key, value] of Object.entries(newDestination)) {
            if(value === "")
                return;
        }

        async function postDestination() {
            const requestBody = {
                name: newDestination.name,
                pickupTime: newDestination.pickupTime,
                dropoffTime: newDestination.dropoffTime,
                image: newDestination.imageByteArrString,
                address: {
                    street: newDestination.street,
                    city: newDestination.city,
                    state: newDestination.state,
                    zipCode: newDestination.zipCode
                }
            }
        
            try {
                const headers = { 'Content-Type': 'application/json'}
                const response = await fetch('http://localhost:8080/destinations', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
                const data = await response.json();
                console.log("Successfully created destination: " + data.name);

                setDestinations(
                  [  ...destinations,
                    data
                  ]
                )
                clearInputForm();
            }
            catch(error) {
                console.log("Error: " + error);
            }
        }

        postDestination();
    }

    // PUT Request - Edit Destination
    const handleUpdateDestination = () => {
      if(!edit || editDestination === null)
        return;
      console.log(editDestination)
      async function putDestination() {
        const requestBody = {
            name: editDestination.hasOwnProperty("name") ? editDestination.name : destination.name,
            pickupTime: editDestination.hasOwnProperty("pickupTime") ? editDestination.pickupTime : destination.pickupTime,
            dropoffTime: editDestination.hasOwnProperty("dropoffTime") ? editDestination.dropoffTime :destination.dropoffTime,
            image: editDestination.hasOwnProperty("imageByteArrString") ? editDestination.imageByteArrString : destination.image,
            address: {
                street: editDestination.hasOwnProperty("street") ? editDestination.street : destination.address.street,
                city: editDestination.hasOwnProperty("city") ? editDestination.city : destination.address.city,
                state: editDestination.hasOwnProperty("state") ? editDestination.state : destination.address.state,
                zipCode: editDestination.hasOwnProperty("zipCode") ? editDestination.zipCode : destination.address.zipCode
            }
        }
    
        try {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch(`http://localhost:8080/destinations/${destination.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if(response.ok) {
              const data = await response.json();
              console.log("Successfully updated destination: " + data.name);
              const updatedDestinations = destinations.map((value) => {
                if(value.id === destination.id)
                  return data;
                else
                  return value;
              })
              setDestinations(updatedDestinations);
              clearInputForm();
            }
            handleClose();
        }
        catch(error) {
            console.log("Error: " + error);
        }
      }
      putDestination();
    }

    // DELETE Request - Delete Destination
    const handleDeleteDestination = () => {
      async function deleteDestination() {
        try {
          const headers = { 'Content-Type': 'application/json'}
          const response = await fetch(`http://localhost:8080/destinations/${destination.id}`, {
              method: 'DELETE',
              headers: headers,
          });
  
          if(response.ok) {
            setDestinations(destinations.filter(value => value.id !== destination.id));
            closeRemove();
            handleClose();
            clearInputForm();
          }
        }
        catch(error) {
            console.log("Error: " + error);
        }
      }
      deleteDestination(); 
    }

    const displayAllDestinations = () => {
        return destinations.map((destination, index) => {
            return(
            <Col key={index} md={4}>
                <Card onClick={() => handleShow(destination)}>
                    <Card.Body>
                        <Card.Title className="text-center">{nameFormatter(destination.name)}</Card.Title>
                        <Row className="justify-content-center mt-3 mb-3">
                            <Col className="p-0" md={4} style={{width: "20vmax"}}>
                            <Image src={`data:image/jpeg;base64,${destination.image}`} className="m-auto"
                                style={{width: "80%", height: "10vmax", objectFit: "cover",display: "block"}} rounded/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            )
        })
    }

    return(
    <Container id="destination_section"  style={{marginTop: "-8%", paddingTop: "10%"}}>
        <h2 className="text-center">Destinations</h2>
        <hr/>

        <Row className="mt-3">
            <Col md={12}>
              <Card>
                <Card.Body>
                <Card.Title className="text-center mb-4"><h3>Create Destination</h3></Card.Title>

                <Row className="justify-content-center mt-3 mb-3">
                    <Col className="p-0" xs={6} md={4} style={{width: "20vmax"}}>
                    <Image src={newDestination.imageUrl} className="m-auto"
                        style={{width: "100%", objectFit: "contain", display: "block"}} thumbnail/>
                    </Col>
                </Row>

                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={newDestination.name}
                        onChange={handleInputChange}
                        placeholder="Enter destination"
                      />
                    </Form.Group>
                    
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Photo</Form.Label>
                      <Form.Control id="uploadDestinationPhoto" name="imageByteArrString" type="file" onChange={uploadPhoto}/>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>Dropoff Time</Form.Label>
                      <Form.Select
                        name="dropoffTime"
                        onChange={handleInputChange}
                        value={newDestination.dropoffTime}
                      >
                        <option key="DEFAULT" value="" disabled>Select a Dropoff Time</option>
                        {dropoffTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                  <Form.Group className="mb-3">
                      <Form.Label>Pickup Time</Form.Label>
                      <Form.Select
                        name="pickupTime"
                        onChange={handleInputChange}
                        value={newDestination.pickupTime}
                      >
                        <option key="DEFAULT" value="" disabled>Select a Pickup Time</option>
                        {pickupTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                  </Col>

                  <hr style={{width: "80%", margin: "0 auto"}}/>

                  <Col className="text-center mt-3" md={12}>
                    <h4>Address</h4>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={newDestination.street}
                        onChange={handleInputChange}
                        placeholder="Enter the Street"
                      />
                    </Form.Group>
                    
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={newDestination.city}
                        onChange={handleInputChange}
                        placeholder="Enter the City"
                      />
                    </Form.Group>
                    
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={newDestination.state}
                        onChange={handleInputChange}
                        placeholder="Enter the State"
                      />
                    </Form.Group>
                    
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={newDestination.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter the Zip Code"
                      />
                    </Form.Group>
                    
                  </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="p-0" md={4}>
                        <Button
                            variant="primary"
                            onClick={handleAddDestination}
                            style={{ marginTop: "45px" }}
                            className="m-auto d-block" // Adding ml-auto and d-block to push button right
                            >
                            Add Destination
                        </Button>
                    </Col>
                </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr/>
          <Card className="mt-3">
            <Card.Body>
                <Card.Title md={12} className="text-center mb-4"><h3>All Destinations</h3></Card.Title>
                <Container><Row className="g-3">{destinations.length > 0 && displayAllDestinations()}</Row></Container>
            </Card.Body>
          </Card>

          {destination && 
          <>
            <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="text-center" closeButton>
                    <Delete className={Styles.DeleteButton} style={{fontSize: "2rem", color: "gray"}} onClick={handleRemove}/>
                    <Edit className={Styles.EditButton} style={{fontSize: "2rem", color: edit ? "blue" : "gray"}} onClick={handleEdit}/>
                    <Modal.Title className="w-100">{ nameFormatter(destination.name)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {edit &&<Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"

                        onChange={handleInputChange}
                        placeholder="Enter destination"
                      />
                    </Form.Group>
                  }
                  {edit ? 
                  <>
                  <Form.Group className="mb-3">
                      <Form.Label>Dropoff Time</Form.Label>
                      <Form.Select
                        name="dropoffTime"
                        onChange={handleInputChange}
                        defaultValue={""}
                      >
                        <option key="DEFAULT" value="" disabled>Select a Dropoff Time</option>
                        {dropoffTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Pickup Time</Form.Label>
                      <Form.Select
                        name="pickupTime"
                        onChange={handleInputChange}
                        defaultValue={""}
                      >
                        <option key="DEFAULT" value="" disabled>Select a Pickup Time</option>
                        {pickupTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                  </>
                  :
                  <Table className="w-50 m-auto" striped bordered >
                    <thead>
                      <tr>
                        <th>Dropoff Time</th>
                        <th>Pickup Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{destination.dropoffTime}</th>
                        <th>{destination.pickupTime}</th>
                      </tr>
                    </tbody>
                  </Table>
                  }
                  <Image src={editImagePreview} className="m-auto mt-3 mb-3"
                                style={{width: "20vmax", height: "10vmax", objectFit: "cover",display: "block"}} rounded={!edit} thumbnail={edit}/>
                  {edit && <Form.Group className="mb-3">
                      <Form.Label>Upload Photo</Form.Label>
                      <Form.Control name="imageByteArrString" type="file" onChange={uploadPhoto}/>
                    </Form.Group>
                  }
                  {
                    edit ?
                    <>
                    <Form.Group className="mb-3">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"

                        onChange={handleInputChange}
                        placeholder="Enter the Street"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"

                        onChange={handleInputChange}
                        placeholder="Enter the City"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"

                        onChange={handleInputChange}
                        placeholder="Enter the State"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"

                        onChange={handleInputChange}
                        placeholder="Enter the Zip Code"
                      />
                    </Form.Group>
                    </>
                    :
                    <h5 className="text-center">{`${destination.address?.street}, ${destination.address?.city}, ${destination.address?.state} ${destination.address?.zipCode}`}</h5>
                  }
                  { edit && <Button className="m-auto" style={{display: "block"}} onClick={handleUpdateDestination}>Save</Button>}
                </Modal.Body>
            </Modal>
            <Modal show={remove} onHide={closeRemove} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Header className="text-center" closeButton>
                    <Modal.Title className="w-100">DELETE {nameFormatter(destination.name)}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete <strong style={{color: "red"}}>{nameFormatter(destination.name)}</strong>?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteDestination}>DELETE</Button>
                    <Button variant="secondary" onClick={closeRemove}>CANCEL</Button>
                  </Modal.Footer>
            </Modal>
          </>
          }
    </Container>
    )
}

export default Destinations;