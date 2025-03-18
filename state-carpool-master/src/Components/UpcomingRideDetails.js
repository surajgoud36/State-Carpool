import React from "react";

import { Container, Row, Col } from "react-bootstrap"; // Assuming Bootstrap is used

import styles from "../Styles/UpcomingRidesDetails.module.css";

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";



const PassengerList = ({passengers, route}) => {

  return (

    <TableContainer component={Paper} className={styles.tableContainer}>

      <Table>

        <TableHead>

          <TableRow className={styles.tableHead}>

            <TableCell>Users</TableCell>

            <TableCell>{route?.routeType === "pickup" ? "Dropoff Address" : "Pickup Address"}</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {passengers.map((passenger, passengerIndex) => (

            <TableRow key={passengerIndex}>

              <TableCell>{passenger?.name || "No Name"}</TableCell>

              <TableCell>

                {passenger?.address?.street || "N/A"}, {passenger?.address?.city || "N/A"}, {passenger?.address?.state || "N/A"}, {passenger?.address?.zipCode}

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  );

};



const DestinationList = ({route, destinations}) => {
  console.log(destinations);
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

      

            {destinations.map((destination, index) => (

              <TableRow key={index}>

                <TableCell>{destination?.name || "N/A"}</TableCell>

                <TableCell>

                  {route?.routeType === "pickup" ? destination?.pickupTime : destination?.dropoffTime || "N/A"}

                </TableCell>

                <TableCell>{destination?.address?.street || "N/A"}, {destination?.address?.city || "N/A"}, {destination?.address?.state || "N/A"}, {destination?.address?.zipCode}</TableCell>

              </TableRow>


          ))}

        </TableBody>

      </Table>

    </TableContainer>

  );

};



const UpcomingRidesDetails = ({ride}) => {
  console.log("Ride ", ride);
  console.log(ride.passengers);
  const passengersLength = ride.passengers.length;
  const destinationsLength = ride.route.destinations.length;
  console.log("Passenger: ",passengersLength);
  console.log("Destination: ", destinationsLength);
  if (!ride) {

    return <p className={styles.noRide}>No ride details available.</p>

  }



  return (

    <Container className={styles.subscriptionContainer}>

      <Row className="justify-content-center">

        <Col>

          <div className={styles.card1}>
            <div className={styles.UPtopnav}>
            
              <h1>Upcoming Ride Details</h1>

              <div className={styles.tablesContainer}>
                
                <Row>

                  <Col md={6} className={styles.tableSpacing}>

                    <h2>PASSENGER LIST</h2>
                    <p><strong>No. Passengers: </strong>{passengersLength}</p>
                    <PassengerList passengers={ride.passengers} route={ride?.route} />

                  </Col>

                  <Col md={6} className={styles.tableSpacing}>

                    <h2>DESTINATION LIST</h2>
                    <p><strong>No. Destinations: </strong>{destinationsLength}</p>

                    <DestinationList destinations={ride.route.destinations} route={ride.route} />

                  </Col>

                </Row>

              </div>

            </div>

          </div>

        </Col>

      </Row>

    </Container>

  );

};



export default UpcomingRidesDetails;