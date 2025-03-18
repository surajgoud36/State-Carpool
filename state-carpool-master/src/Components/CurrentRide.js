import React, { useState, useEffect } from 'react';
import Chatbox from './Chatbox';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import styles from "../Styles/CurrentRide.module.css";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { useUser } from "./UserContext";

export default function CurrentRide() {
  const [passengers, setPassengers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [rideInfo, setRideInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const{user} = useUser(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const rideResponse = await fetch("http://localhost:8080/rides/driverrides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            driverId: user.id,
          }),
        });
        const rideData = await rideResponse.json();

        if (rideData && rideData.length > 0) {
          setRideInfo(rideData[0]);
          setPassengers(rideData[0].passengers || []);
          setDestinations(rideData[0].route?.destinations || []);
        }
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  const { route } = rideInfo;

  function PassengerList() {
    const handleCheckboxChange = (passengerIndex) =>{
      const updatedPassengers = [...passengers];
      updatedPassengers[passengerIndex].picked = !updatedPassengers[passengerIndex].picked;
      setPassengers(updatedPassengers);
    };
    return (
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHead}>
              <TableCell>#</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Pickup Address</TableCell>
              <TableCell>Picked</TableCell>
              <TableCell>Chat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map((passenger, passengerIndex) => (
              <TableRow key={passengerIndex}>
                <TableCell>{passengerIndex + 1}</TableCell>
                <TableCell>{passenger.name || "No Name"}</TableCell>
                <TableCell>
                  {passenger?.address?.street || "N/A"}, {passenger?.address?.city || "N/A"}, {passenger?.address?.state || "N/A"}, {passenger?.address?.zipCode}
                </TableCell>
                <TableCell>
                  <Checkbox checked={passenger.picked || false} onChange={() => handleCheckboxChange(passengerIndex)} />
                </TableCell>
                <TableCell>
                  <Chatbox riderId={passenger.id} driverId={user.id} rideId={rideInfo.id} recipientName={passenger.name}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function DestinationList() {
    return (
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHead}>
              <TableCell>Destination</TableCell>
              <TableCell>{route.routeType === "pickup" ? "Pickup Time" : "Dropoff Time"}</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {destinations && destinations.length > 0 ? (
              destinations.map((destination, index) => (
                <TableRow key={index}>
                  <TableCell>{destination.name || "N/A"}</TableCell>
                  <TableCell>
                    {route.routeType === "pickup" ? destination.pickupTime : destination.dropoffTime || "N/A"}
                  </TableCell>
                  <TableCell>{destination?.address?.street}, {destination?.address?.city}, {destination?.address?.state}, {destination?.address?.zipCode}</TableCell>
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
  }

  return (
    <Container className={styles.subscriptionContainer}>
      <Row className="justify-content-center">
        <Col>
          <div className={styles.formCard}>
            <div className={styles.UPtopnav}>
            </div>
            <Box>
              {rideInfo && Object.keys(rideInfo).length > 0 ? (
              <div className={styles.routeMapDetails}>
                {/* Route Image moved above tables */}
                <Row className="justify-content-center">
                  <Col md={6} className={styles.routeImageCol}>
                    <h3>Route Details</h3>
                    <img
                      src="https://lh3.googleusercontent.com/zk5rRW44qfnxzYRaxus9lgmTHHy-B29LpI-mYcq0dkvI-kQXX960ReoXulj8jpa4RSi_d9UmeeAmBsIKyLUx1UPKxW86cksWwxR6Cg=w320"
                      alt="Ride Map"
                      className={`${styles.routeMapImage} ${styles.largeImage}`} // Add class for larger size
                    />
                  </Col>
                </Row>

                <Box className={styles.tablesContainer}>
                  <Row>
                    <Col md={6} className={styles.tableSpacing}>
                      <h2 className="text-center">PASSENGER LIST</h2>
                      <Stack className="justify-content-center mb-3" direction="horizontal" gap={2}>
                        <strong>No. of Passengers:</strong> {passengers.length} <div>|</div>
                        <strong>{route?.routeType === "pickup" ? "Dropoff Service" : "Pickup Service"}</strong> 
                      </Stack>
                      <PassengerList />
                    </Col>
                    <Col md={6} className={styles.tableSpacing}>
                      <h2 className="text-center">DESTINATION LIST</h2>
                      <Stack className="justify-content-center mb-3" direction="horizontal" gap={2}>
                        <strong>No. of Destinations:</strong> {destinations.length} <div>|</div>
                        <strong>{route?.routeType === "pickup" ? "Pickup Service" : "Dropoff Service"}</strong> 
                      </Stack>
                      <DestinationList />
                    </Col>
                  </Row>
                </Box>
              </div>
              ) : (
                <div className={styles.noRides}>
                  <h2>No rides available</h2>
                  <p>Please check back later for available rides.</p>
                </div>
              )}
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
