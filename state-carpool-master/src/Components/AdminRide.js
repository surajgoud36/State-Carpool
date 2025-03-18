import { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
  Modal,
  Table,
  Form,
} from "react-bootstrap";

import styles from "../Styles/AdminRide.module.css";

import { nameFormatter, dateFormatter } from "../Functions";

const AdminRide = () => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [checkBoxes, setCheckboxes] = useState({});

  const [key, setKey] = useState("create"); // Track active tab

  const [bookingData, setBookingData] = useState([]);

  const [routeData, setRouteData] = useState([]);

  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  const [routeType, setRouteType] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);

  const [drivers, setDrivers] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");

  const [rides, setRides] = useState([]);

  const [editBookingData, setEditBookingData] = useState([]);

  const [filteredContext, setFilteredContext] = useState({
    date: "",
    type: "",
  });

  const [activeTypes, setActiveTypes] = useState({});

  const [editShowModal, setEditShowModal] = useState(false);

  const [rideToEdit, setRideToEdit] = useState(null);

  // Fetch booking data

  useEffect(() => {
    async function fetchBookingData() {
      const response = await fetch("http://localhost:8080/bookings/scheduled");

      const jsonData = await response.json();

      setBookingData(jsonData);
    }

    fetchBookingData();
  }, []);

  // Fetch routes data

  useEffect(() => {
    async function fetchRouteData() {
      const response = await fetch("http://localhost:8080/routes");

      const jsonData = await response.json();

      setRouteData(jsonData);
    }

    fetchRouteData();
  }, []);

  // Fetch driver data

  useEffect(() => {
    async function fetchDriverData() {
      const response = await fetch("http://localhost:8080/users");

      const jsonData = await response.json();

      setDrivers(jsonData.filter((user) => user.roles.includes("ROLE_DRIVER")));
    }

    fetchDriverData();
  }, []);

  //console.log(drivers);

  // Fetch rides

  const fetchRides = useEffect(() => {
    async function fetchRides() {
      const response = await fetch("http://localhost:8080/rides");

      const jsonData = await response.json();

      setRides(jsonData);
    }

    fetchRides();
  }, []);

  //console.log("Rides", rides);

  const handleFilterRoutes = (date, type) => {
    setSelectedDate(date);

    setRouteType(type);
    console.log("Type", type);

    setFilteredContext({ date, type });

    setActiveTypes((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (key !== date) {
          delete updated[key]; // Clear other dates
        }
      });

      updated[date] = type; // Set active type for current date

      return updated;
    });

    const filtered = routeData.filter((route) => {
      
      if (route.routeType !== type) {
        return false;
      }

      return bookingData.some((booking) => {
        return (
          booking.date === date &&
          route.routeType === booking.rideType &&
          route.destinations.some(
            (destination) =>
              destination.name.toLowerCase() ===
              booking.destination.name.toLowerCase()
          )
        );
      });
    });
    console.log("Filtered: ", filtered)
    setFilteredRoutes(filtered);
  };

  // Open modal

  const handleOpenModal = (route) => {
    setSelectedRoute(route);

    setShowModal(true);
  };

  const handleOpenEditModal = (ride) => {
    async function fetchBookingsByRide() {
      const response = await fetch(
        `http://localhost:8080/bookings/rides/${ride.id}`
      );
      const jsonData = await response.json();
      return jsonData;
    }

    fetchBookingsByRide().then((data) => {
      console.log("Booking Data", data);
      setEditBookingData(data);
      setRideToEdit(ride);
      setEditShowModal(true);
      let bookingIds = data.map(booking => booking.id);
      let checkBoxesObj = {}
      bookingIds.map((id) => {
        checkBoxesObj[id] = true;
      })
      console.log(checkBoxesObj)
      setSelectedBookings(bookingIds);
      setCheckboxes(checkBoxesObj);
    });
  };

  const handleCloseEditModal = () => {
    setEditShowModal(false);

    setRideToEdit(null);
  };

  const handleSaveEdits = async () => {
    if (!rideToEdit) return;
    //console.log("Ride to edit", rideToEdit);

    const putData = {
      date: dateFormatter(rideToEdit.date),
      createdAt: rideToEdit.createdAt,
      bookingIds: selectedBookings,
      driverId: rideToEdit.driver.id,
      routeId: rideToEdit.route.id,
    };
    console.log(selectedBookings)
    console.log("Put data", putData);

    try {
      const response = await fetch(
        `http://localhost:8080/rides/${rideToEdit.id}`,
        {
          method: "PUT",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(putData),
        }
      );

      if (response.ok) {
        alert("Ride updated successfully!");

        setEditShowModal(false);

      } else {
        alert("Failed to update ride. Try again.");
      }
    } catch (e) {
      console.error("Error updating ride:", e);
    }
  };

  const handleCreateRide = async () => {
    if (!selectedDriver) {
      alert("Please select a Driver.");

      return;
    }

    const bookingIds = bookingData

      .filter(
        (booking) =>
          booking.date === selectedDate &&
          selectedRoute.destinations.some(
            (destination) =>
              destination.name.toLowerCase() ===
              booking.destination.name.toLowerCase()
          )
      )

      .map((booking) => booking.id);

    const rideDetails = {
      date: selectedDate,

      createdAt: new Date().toLocaleDateString(),

      bookingIds: bookingIds,

      routeId: selectedRoute.id,

      driverId: selectedDriver.id,
    };

    try {
      const response = await fetch("http://localhost:8080/rides", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(rideDetails),
      });

      if (response.ok) {
        alert("Ride created successfully!");

        console.log(rideDetails);

        setShowModal(false);

        setFilteredRoutes([]);

        setSelectedDriver("");

        setSelectedDate("");
      } else {
        alert("Failed to create ride. Try again.");
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  const handleRiderSelection = (e) => {
    let selectedBookingId = parseFloat(e.target.value);
    if(checkBoxes[e.target.value]) {
      // Remove
      const updatedBookings = selectedBookings.filter(bookingId => selectedBookingId != bookingId);
      setSelectedBookings(updatedBookings);
    }
    else {
      // Add
      setSelectedBookings([...selectedBookings, selectedBookingId]);
    }

    setCheckboxes({
      ...checkBoxes,
      [e.target.value]: !checkBoxes[e.target.value]
    })

  }
  console.log("Booking Data", bookingData);

  return (
    <Container
      className={styles.bookingContainer}
      id="ride_section"
      style={{ marginTop: "-8%", paddingTop: "10%" }}
    >
      <h2 className="text-center">Ride</h2>

      <hr></hr>

      <Tabs
        id="ride-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="create" title="Create a Ride">
          <Row>
            {[...new Set(bookingData.map((b) => b.date))].map((date) => (
              <Col key={date} xs={4} className="text-center mb-3">
                <h6>{date}</h6>

                <div className={styles.buttonGroup}>
                  <Button
                    variant="outline-primary"
                    className={activeTypes[date] === "dropoff" ? "active" : ""}
                    onClick={() => handleFilterRoutes(date, "dropoff")}
                  >
                    Dropoff
                  </Button>

                  <Button
                    variant="outline-secondary"
                    className={activeTypes[date] === "pickup" ? "active" : ""}
                    onClick={() => handleFilterRoutes(date, "pickup")}
                  >
                    Pickup
                  </Button>
                </div>

                {filteredContext.date === date &&
                  filteredRoutes.length > 0 &&
                  filteredRoutes.map((route) => (
                    <div key={route.id} className={styles.routeCard}>
                      <h6>Route ID: {route.id}</h6>

                      <p>
                        Destinations:{" "}
                        {route.destinations.map((d) => d.name).join(", ")}
                      </p>

                      <h6>Bookings:</h6>

                      <ul>
                        {bookingData

                          .filter(
                            (booking) =>
                              booking?.date === date && booking.rideType === route.routeType &&
                              route.destinations.some(
                                (destination) =>
                                  destination.name === booking?.destination.name
                              )
                          )

                          .map((booking) => (
                            <li key={booking.id}>
                              <p>Name: {nameFormatter(booking?.rider.name)}</p>

                              <p>
                                Destination:{" "}
                                {nameFormatter(booking?.destination.name)}
                              </p>
                            </li>
                          ))}
                      </ul>

                      <Button
                        variant="primary"
                        onClick={() => handleOpenModal(route)}
                      >
                        Group Bookings
                      </Button>
                    </div>
                  ))}
              </Col>
            ))}
          </Row>

          {/* Modal for assigning a driver */}

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Driver</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Route ID: {selectedRoute?.id}</p>

              <p>Date: {filteredContext.date}</p>

              <p>
                Type:{" "}
                {filteredContext.type === "dropoff" ? "Drop Off" : "Pick Up"}
              </p>

              <select
                className="form-control"
                value={selectedDriver?.id || ""}
                onChange={(e) => {
                  const selected = drivers.find(
                    (driver) => String(driver.id) === e.target.value
                  );

                  console.log("Selected Driver", selected);

                  setSelectedDriver(selected);
                }}
              >
                <option value="">Select a driver</option>

                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleCreateRide}
                disabled={!selectedDriver}
              >
                Create Ride
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>

        <Tab eventKey="all" title="All Rides">
          <h4>All Rides</h4>

          <Table striped bordered>
            <thead>
              <tr>
                <th>Edit</th>

                <th>Ride ID</th>

                <th>Type</th>

                <th>Date</th>

                <th>Driver</th>

                <th>Starting Destination</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(rides).map((ride) => (
                <tr key={ride.id}>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleOpenEditModal(ride)}
                    >
                      Edit
                    </Button>
                  </td>

                  <td>{ride.id}</td>

                  <td>
                    {ride.route.routeType === "dropoff" ? "Dropoff" : "Pickup"}
                  </td>

                  <td>{ride.date}</td>

                  <td>{nameFormatter(ride.driver.name)}</td>

                  <td>{nameFormatter(ride.route.destinations[0].name)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Editing Ride */}

          <Modal show={editShowModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              {rideToEdit && <Modal.Title>Edit Ride ID: {rideToEdit.id}</Modal.Title> }
            </Modal.Header>

            <Modal.Body>
              {rideToEdit && (
                <>
                  <div className="mb-3">
                    <label><strong>Date</strong></label>

                    <input
                      type="date"
                      className="form-control"
                      value={rideToEdit.date}
                      onChange={(e) =>
                        setRideToEdit({ ...rideToEdit, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label><strong>Bookings</strong></label>
                    <div style={{border: "1px solid #E8E8E8", borderRadius: "1vmax", padding: "8px"}}>
                    <div className="text-center d-flex justify-content-center align-center">
                      <h6 style={{marginRight: "2vmax"}}><strong>Booking ID:</strong></h6> <h6><strong>Passenger:</strong></h6>
                    </div>
                    {editBookingData.map((booking, index) => 
                    (
                      <div key={booking.id} className="m-auto mb-2" style={{width: "80%"}}>
                       
                        <div key={booking.rider.id} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input me-5"
                              name={`booking-${booking.id}`}
                              id={`booking-${booking.id}`}
                              value={booking.id}
                              checked={checkBoxes[booking.id]}
                              onChange={handleRiderSelection}
                            />
                            <label className="form-check-label" htmlFor={`rider-${booking.rider.id}`}>
                              <div className="text-center d-flex justify-content-center align-center">
                                <h6 className="ms-5 me-5">{booking.id}</h6> <h6 className="ms-3">{booking.rider.name}</h6>
                              </div>
                            </label>
                          </div>
                      </div>
                      ))}
                      </div>
                  </div>

                  <div className="mb-3">
                    <label><strong>Driver</strong></label>

                    <select
                      className="form-control"
                      value={rideToEdit.driver?.id || ""}
                      onChange={(e) =>
                        setRideToEdit({
                          ...rideToEdit,

                          driver: drivers.find(
                            (driver) => driver.id === parseInt(e.target.value)
                          ),
                        })
                      }
                    >
                      <option value="">Select a driver</option>

                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancel
              </Button>

              <Button variant="primary" onClick={handleSaveEdits}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminRide;
