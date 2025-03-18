import { Container, Image, Row, Col, Stack, Button, Table} from "react-bootstrap";
import { AccountCircle } from "@mui/icons-material";
import Chatbox from "./Chatbox";
import { useLocation } from "react-router-dom";
import { nameFormatter, compareByPickupTimes, compareByDropoffTimes } from "../Functions";
import { useUser } from "./UserContext";

function RiderTripDetail() {
    const { user } = useUser();
    const location = useLocation();
    const { state } = location || {};
    const trip = state?.trip || null;
    const tripTime = state?.time || null;
    const destination = trip !== null ? trip.destination : null;
    const pastTrip = state?.past || null; // Used for different display rendering

    const displayRouteDetails = () => {
        const routeDestinations = trip.ride.route.destinations;
        const sortedDestinations = trip.rideType === "pickup" ? routeDestinations.sort(compareByPickupTimes) : routeDestinations.sort(compareByDropoffTimes);
        return sortedDestinations.map((routeDestination, key) => {
            return(
                <tr key={key}>
                    <td>{routeDestination.name}</td>
                    <td>{trip.rideType === "dropoff" ? routeDestination.dropoffTime: routeDestination.pickupTime}</td>
                </tr>
            )
        })
    }

    return(
        <Container fluid className="d-flex justify-content-center" style={{padding: "0"}}>
            <Stack gap={4}>
            <Row className="fluid g-0" style={{height: "50vh", width: "100%", margin: "0"}}>
                <Image fluid style={{width: "100%", height: "100%", padding: "0"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/EmpireStatePlazaPanorama.jpg/368px-EmpireStatePlazaPanorama.jpg"/>
            </Row>

            <Container>
                <Row className="flex-nowrap">
                    <Col>
                        <Stack direction="vertical">
                            <h2>{nameFormatter(destination.name)}</h2>
                            <h5>{`${destination.address.street}, ${destination.address.city}, ${destination.address.state} ${destination.address.zipCode}`}</h5>
                            <h5>{`${tripTime} ${trip.rideType.toUpperCase()}`}</h5>
                            <h5>{trip.date}</h5>
                        </Stack>
                    </Col>

                    <Col sm="2" md="2" lg="2">
                        <Stack direction="vertical" style={{justifyContent: "center", alignItems: "center"}}>
                            <AccountCircle style={{fontSize: "7rem"}}/>
                            <h4>{ nameFormatter(trip.ride.driver.name) }</h4>
                            <Stack direction="horizontal" gap={3} style={{margin: "0 auto"}}>
                                {!pastTrip && 
                                <>
                                    <Chatbox riderId={user.id} driverId={trip.ride.driver.id} rideId={trip.ride.id} recipientName={trip.ride.driver.name}/>
                                    <Button size="sm">Cancel Trip</Button>
                                </>
                                }
                            </Stack>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            
            <Container>
                <Row className="text-center"><h3>Route</h3></Row>
                <Row>
                    <Col className="col-3"/>
                    <Col className="col-6">
                        <Table size="md">
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayRouteDetails()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </Stack>
        </Container>
    );
}

export default RiderTripDetail;