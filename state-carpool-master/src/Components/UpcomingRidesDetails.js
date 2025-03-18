import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Assuming Bootstrap is used
import styles from "../Styles/UpcomingRidesDetails.module.css";
import { useLocation } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Checkbox } from "@mui/material";

const PassengerList = ({ passengers }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell>Users</TableCell>
            <TableCell>Pickup Address</TableCell>
            <TableCell>Dropoff Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {passengers.map((passenger, passengerIndex) => (
              <TableRow key={passengerIndex}>
                <TableCell>{passenger.name || "No Name"}</TableCell>
                <TableCell>
                  {passenger?.address?.street || "N/A"}, {passenger?.address?.city || "N/A"}, {passenger?.address?.state || "N/A"}, {passenger?.address?.zipCode}
                </TableCell>
                <TableCell>{passenger?.workplace || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
};

const DestinationList = ({ destinations }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell>Destination</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {destinations && destinations.length > 0 ? (
              destinations.map((destination, index) => (
                <TableRow key={index}>
                  <TableCell>{destination.name || "N/A"}</TableCell>
                  <TableCell>
                    {destination.pickupTime || destination.dropoffTime || "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No destinations available</TableCell>
              </TableRow>
            )}
          </TableBody>
      </Table>
    </TableContainer>
  );
};

const UpcomingRidesDetails = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  if (!ride) {
    return <p className={styles.noRide}>No ride details available.</p>;
  }
  const { route = {}, passengers = [] } = ride;
  const { destinations = [] } = route;

  return (
    <Container className={styles.subscriptionContainer}>
      <Row className="justify-content-center">
        <Col>
          <div className={styles.card1}>
            <div className={styles.UPtopnav}>
              <h1>Upcoming Ride Details</h1>
              <div className={styles.imageContainer}>
                <img
                  src="ride.png" // Replace with your image URL
                  alt="Upcoming Ride Visual"
                  className={styles.rideImage}
                />
              </div>
              <div className={styles.tablesContainer}>
                <Row>
                  <Col md={6} className={styles.tableSpacing}>
                    <h2>PASSENGER LIST</h2>
                    <PassengerList passengers={passengers} />
                  </Col>
                  <Col md={6} className={styles.tableSpacing}>
                    <h2>DESTINATION LIST</h2>
                    <DestinationList destinations={destinations} />
                  </Col>
                </Row>
              </div>

              {/* Add an image below the tables */}
  
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpcomingRidesDetails;
