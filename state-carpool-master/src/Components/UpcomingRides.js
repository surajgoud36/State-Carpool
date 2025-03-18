import React, { useState, useEffect } from "react";
import styles from "../Styles/UpcomingRides.module.css";
import UpcomingRidesDetails from "./UpcomingRideDetails";
import { useUser } from "./UserContext";
import { Container, Row, Col, Modal, Image } from "react-bootstrap"
const UpcomingRides = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const requestData = {
        driverId: user.id,
      }
      try {
        setLoading(true);
        const ridesResponse = await fetch("http://localhost:8080/rides/driverrides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });
        if (!ridesResponse.ok) throw new Error("Failed to fetch rides data");
        const ridesData = await ridesResponse.json();
        setRides(ridesData.filter((ride, index) => {
            if(index !== 0)
              return ride;
        }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user.id]);
  console.log(rides);
  const showModal = () => {
    setShow(true);
  }
  const closeModal = () => {
    setShow(false);
  }
  return (
    <Container className={styles.upcomingRides}>
      <Row className="justify-content-center">
        <Col xs={12} className={styles.headTitle}>
          <h4 className={styles.upRide}>Upcoming Rides</h4>
        </Col>
      </Row>
      <hr className={styles.horizontalBar} />

      {loading ? (
        <p>Loading rides...</p>
      ) : error ? (
        <p className={styles.error}>Error: {error}</p>
      ) : (
        <Row className={styles.ridesList}>
          {rides.map(ride => {
            console.log(ride)
            const route = ride.route || {};
            const passengers = ride.passengers || [];
            const destinations = route.destinations || [];
            const destination = destinations[0];
            //const pickupTime = destination.pickupTime || "Unknown Time";
            //const dropoffTime = destination.dropoffTime || "Unknown Time";
            const routeType = route.routeType || "Unknown Route";
            const destinationName = destination.name || "Unknown Destination";
            const pickupAddress = destination.address || {};
            const pickupStreet = pickupAddress?.street || "Unknown Street";
            const pickupCity = pickupAddress?.city || "Unknown City";
            const pickupState = pickupAddress?.state || "Unknown State";
            const pickupZipCode = pickupAddress?.zipCode || "Unknown Zip";
            const imageUrl = destination.image || "";
            const decodedImageUrl = imageUrl
              ? `data:image/jpeg;base64,${imageUrl}`
              : "https://via.placeholder.com/150";
            const rideDate = new Date(ride.date.replace(/'/g, ""));
            const formattedDate = rideDate.toLocaleDateString();
            console.log(imageUrl);
            return (
              <>
                <Row key={ride.id} className={styles.rideItem} onClick={showModal}>
                  {/* Title and Image */}
                  <Col xs={12} md={4} className={styles.titleSection}>
                    <h1>{destinationName}</h1>
                    <Image src={decodedImageUrl} rounded fluid className={styles.rideImg} />
                  </Col>



                  {/* Ride Details */}
                  <Col xs={12} md={8} className={styles.rideDetails}>
                    <p>Route Type: {routeType === "pickup" ? "Pickup" : "Dropoff"}</p>
                    <p>
                      {pickupStreet}, {pickupCity}, {pickupState}, {pickupZipCode}
                    </p>
                    <p>Passengers: {passengers.length}</p>
                    <p>Destinations: {destinations.length}</p>
                    <p>Date: {formattedDate}</p>
                  </Col>
                </Row>

                <Modal show={show} onHide={closeModal} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                    <Modal.Body>
                      <UpcomingRidesDetails ride={ride}/>
                    </Modal.Body>



                </Modal>
              </>
            );
          }) }
        </Row>
      )}
    </Container>
  );
};

export default UpcomingRides;