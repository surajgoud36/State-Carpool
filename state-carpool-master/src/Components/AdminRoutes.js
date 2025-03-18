import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Modal,
  Form,
  Table
} from "react-bootstrap";
import styles from "../Styles/AdminRoutes.module.css"; // Import the CSS module
import { compareByPickupTimes, compareByDropoffTimes } from "../Functions";
import Select from 'react-select';

function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [destinations, setDestinations] = useState([]); // A list of all destinations for creating new routes
  const [selectedTab, setSelectedTab] = useState("pickup"); // Set default value to "pickup"

  // State for handling route edit
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRouteType, setSelectedRouteType] = useState("pickup");

  const closeCreateModal = () => {
    setShowCreateModal(false);
    // Reset the route creation on exist
    setSelectedOptions([]);
    setNewRoute({
      routeType: "pickup",
      destinationIds: []
    }) 
  }
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = (route) => {
    setShowEditModal(true);
    const ids = route?.destinations.map(destination => destination.id);
    setEditRoute({
      routeType: route?.routeType,
      destinationIds: ids
    })
    setSelectedOptions(route?.destinations?.map((destination) => {
      return { value: destination.id, label: `${destination.name} ${selectedTab === "pickup" ? destination.pickupTime : destination.dropoffTime}`}
    }))
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditRoute({
      routeType: "",
      destinationIds: []
    });
    setSelectedOptions([]);
    setCurrentRoute({});
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentRoute({});
  }

  const [currentRoute, setCurrentRoute] = useState({});

  // Handle route creation
  const [newRoute, setNewRoute] = useState({
    routeType: "pickup",
    destinationIds: []
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [editRoute, setEditRoute] = useState({
    routeType: "",
    destinationIds: []
  })
  
  useEffect(() => {
    async function fetchRoutes() {
      const headers = { 'Content-Type': 'application/json'}
      const response = await fetch('http://localhost:8080/routes', {headers});
      const data = await response.json();
      setRoutes(data);
    }

    async function fetchDestinations() {
      const headers = { 'Content-Type': 'application/json'}
      const response = await fetch('http://localhost:8080/destinations', {headers});
      const data = await response.json();
      setDestinations(data);
    }

    fetchRoutes();
    fetchDestinations();
  }, [])

  const handleCreateRoute = () => {
    // Make Post Request 
    async function postRoute() {
      const requestBody = {
          routeType: newRoute.routeType,
          destinationIds: newRoute.destinationIds
      }

      try {
          const headers = { 'Content-Type': 'application/json'}
          const response = await fetch('http://localhost:8080/routes', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(requestBody)
          });
          const data = await response.json();
          console.log("Successfully created route: " + data.name);

          setRoutes(
            [  ...routes,
              data
            ]
          )
          closeCreateModal();
      }
      catch(error) {
          console.log("Error: " + error);
      }
    }
    postRoute();
  };

  const handleEditRoute = () => {
    // Make PUT Request
    console.log(editRoute.destinationIds)
    async function putRoute() {
      const requestBody = {
         routeType: editRoute.routeType,
         destinationIds: editRoute.destinationIds
      }
   
      try {
          const headers = { 'Content-Type': 'application/json'}
          const response = await fetch(`http://localhost:8080/routes/${currentRoute.id}`, {
              method: 'PUT',
              headers: headers,
              body: JSON.stringify(requestBody)
          });

          if(response.ok) {
            const data = await response.json();
            console.log("Successfully updated route: " + data);
            const updatedRoutes = routes.map((value) => {
              if(value.id === currentRoute.id)
                return data;
              else
                return value;
            })
            setRoutes(updatedRoutes);
            handleCloseEditModal();
          }
      }
      catch(error) {
          console.log("Error: " + error);
      }
    }
    putRoute();
  };

  const handleDeleteRoute = () => {
    // Delete Request
    async function deleteRoute() {
      try {
        const headers = { 'Content-Type': 'application/json'}
        const response = await fetch(`http://localhost:8080/routes/${currentRoute.id}`, {
            method: 'DELETE',
            headers: headers,
        });

        if(response.ok) {
          setRoutes(routes.filter(value => value.id !== currentRoute.id));
          handleCloseDeleteModal();
        }
      }
      catch(error) {
          console.log("Error: " + error);
      }
    }
    deleteRoute();
  }

  // Handles input form data for creation/edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if(name === "routeType") {
      setSelectedRouteType(value);
      // Clear the selected destinations because the times need to be updated
      setSelectedOptions([]);
      if(showCreateModal) {
        setNewRoute({
          ...newRoute,
          destinationIds: []
        })
      }
      else {
        setEditRoute({
          ...editRoute,
          destinationIds: []
        })
      }
    }

    if (showCreateModal) {
      setNewRoute({ ...newRoute, [name]: value });
    } else {
      setEditRoute({ ...editRoute, [name]: value });
    }
  };

  // Handles multi-select input form data for creation/edit
  const handleMultiChange = (options, actionObject) => {
    if(actionObject.action === "select-option") {
      const option = actionObject.option;
      const value = option.value;
      setSelectedOptions(options);
      // Edit
      if(showEditModal) {
        setEditRoute({
          ...editRoute,
          destinationIds: [...editRoute.destinationIds, value]
        })
      } // Create
      else {
        setNewRoute({
          ...newRoute,
          destinationIds: [...newRoute.destinationIds, value]
        })
      }
    }
    else if(actionObject.action === "remove-value") {
      const option = actionObject.removedValue;
      const value = option.value;

      setSelectedOptions(selectedOptions.filter(v => v.value !== value));
      // Edit
      if(showEditModal) {
        setEditRoute({
          ...editRoute, 
          destinationIds: editRoute.destinationIds.filter(destinationId => destinationId !== value)
        })
      } // Create
      else {
        setNewRoute({
          ...newRoute, 
          destinationIds: newRoute.destinationIds.filter(destinationId => destinationId !== value)
        })
      }
    }
    else if(actionObject.action === "clear") {
      setSelectedOptions([]);
      //Edit
      if(showEditModal) {
        setEditRoute({
          ...editRoute,
          destinationIds: []
        })
      } // Create
      else{
        setNewRoute({
          ...newRoute,
          destinationIds: []
        })
      }
    }
  }

  // Filter routes based on selectedTab
  const filteredRoutes = routes.filter(
    (route) => route.routeType === selectedTab // Direct match on type
  );

  // Set up multi select for destinations on create route
  const destinationOptions = destinations.map((destination) => {
    return { value: destination.id, label: `${destination.name} ${selectedTab === "pickup" ? destination.pickupTime : destination.dropoffTime}`}
  })

  const destinationPickUpOptions = destinations.map((destination) => {
    return { value: destination.id, label: `${destination.name} ${destination.pickupTime}`}
  })

  const destinationDropOffOptions = destinations.map((destination) => {
    return { value: destination.id, label: `${destination.name} ${destination.dropoffTime}`}
  })
  
  return (
    <Container id="route_section" className={styles.container} style={{marginTop: "-8%", paddingTop: "10%"}}>
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h2 className="text-center">Routes</h2>
          <hr />
        </Col>
      </Row>

      {/* Tabs for Pickups and Dropoffs */}
      <Row className="mb-4">
        <Col>
          <Tabs
            activeKey={selectedTab}
            onSelect={(k) => setSelectedTab(k)} // Ensures selectedTab is updated correctly
            id="admin-tabs"
            className="mb-3"
          >
            <Tab eventKey="pickup" title="Pickups"></Tab>
            <Tab eventKey="dropoff" title="Dropoffs"></Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Create Route Button */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="outline-primary"
            className={`${styles.createButton} d-flex align-items-center`}
            onClick={() => setShowCreateModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i> Create Route
          </Button>
        </Col>
      </Row>

      {/* Route Cards */}
      <Row className="mb-5">
        {filteredRoutes.length === 0 ? (
          <Col className="text-center">No routes to display</Col>
        ) : (
          filteredRoutes.map((route, index) => { 
            const sortedDestinations = selectedTab === "pickup" ? route.destinations.sort(compareByPickupTimes) : route.destinations.sort(compareByDropoffTimes);
          return (
            <Col md={4} key={route.id} className="mb-4">
              <Card className={styles.card}>
                <Card.Header>
                  <Card.Title className="text-center">
                  <strong>Route ID:</strong> {route.id}
                  </Card.Title>
                </Card.Header>
                {/* Card Details */}
                <Card.Body style={{overflowY: "scroll", height: "15vmax"}}>
                <Table key={index}>
                  <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Time</th>
                          </tr>
                  </thead>
                  <tbody>
                  {
                    sortedDestinations.map((destination, index) => (
                      <tr key={index}>
                        <th>{destination?.id}</th>
                        <th>{destination?.name}</th>
                        <th style={{whiteSpace: "nowrap"}}>{selectedTab === "pickup" ? destination?.pickupTime : destination?.dropoffTime} </th>
                      </tr>  
                    ))
                  }
                  </tbody>
                </Table>
                </Card.Body>
                <Card.Footer>
                  {/* Delete Section */}
                  <Button
                    variant="link"
                    style={{textDecoration: "none"}}
                    onClick={() => {
                        setCurrentRoute(route);
                        handleShowDeleteModal();
                    }}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                  {/* Edit Section */}
                  <Button
                    variant="link"
                    className={styles.cardButton}
                    onClick={() => {
                      setCurrentRoute(route);
                      handleShowEditModal(route);
                    }}
                  >
                  <i className="bi bi-pencil"></i> Edit
                </Button>
                </Card.Footer>
              </Card>
            </Col>
          )})
        )}
      </Row>

      {/* Create Route Modal */}
      <Modal show={showCreateModal} 
             onHide={closeCreateModal} 
             backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Destinations</Form.Label>
            <Select
              options={selectedRouteType === "pickup" ? destinationPickUpOptions : destinationDropOffOptions}
              isMulti
              name="destinationIds"
              placeholder="Select destination(s) for the route..."
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleMultiChange}
              value={selectedOptions}
            />

            <Form.Group className="mt-3 mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="routeType"
                value={newRoute.routeType}
                onChange={handleChange}
              >
                <option value="pickup">Pickup</option>
                <option value="dropoff">Dropoff</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoute}
                  disabled={newRoute?.destinationIds === undefined || newRoute?.destinationIds.length === 0}>
            Save Route
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Route Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Label>Destinations</Form.Label>
          <Select
              options={destinationOptions}
              isMulti
              name="destinationIds"
              placeholder="Select destination(s) for the route..."
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleMultiChange}
              value={selectedOptions}
            />
            
            <Form.Group className="mb-3">
              <Form.Label>Route Type</Form.Label>
              <Form.Select
                name="routeType"
                value={currentRoute.routeType}
                onChange={handleChange}
              >
                <option value="pickup">Pickup</option>
                <option value="dropoff">Dropoff</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditRoute}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Route Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className="w-100">DELETE Route ID: {currentRoute.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong style={{color: "red"}}>Route ID: {currentRoute.id}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteRoute}>DELETE</Button>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>CANCEL</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminRoutes;
