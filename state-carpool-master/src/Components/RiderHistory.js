import Styles from '../Styles/RiderHistory.module.css';
import { Container, Row, Col, Image, Stack, Form, Alert, Spinner} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { nameFormatter } from '../Functions';
import { useNavigate } from 'react-router-dom';

function RiderHistory() {
    const navigate = useNavigate();
    const[filter, setFilter] = useState("");
    const[trips, setTrips] = useState(null);
    const{user} = useUser(null);

    useEffect(() => {
        async function fetchAllPastTrips() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch(`http://localhost:8080/bookings/previous/user/${user.id}`, {headers});
            const data = await response.json();
            setTrips(data);
        }

        async function fetchThisMonthPastTrips() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch(`http://localhost:8080/bookings/previousmonth/user/${user.id}`, {headers});
            const data = await response.json();
            setTrips(data);
        }
        if(filter === "") {
            fetchAllPastTrips();
        }
        else if(filter === "MONTH") {
            fetchThisMonthPastTrips();
        }
        else {
            setTrips(null);
        }

    }, [filter, user.id])

    const displayTripHistory = () => {
        if(trips == null)
            return;
        return trips.map((trip, index) => {
            const destination = trip.destination;
            const tripTime = trip.rideType === "dropoff" ? destination.dropoffTime : destination.pickupTime;
            return(
                <Container key={index} className="d-flex justify-content-center align-items-center"
                               onClick={() => viewTripDetails(trip, tripTime)} style={{cursor: "pointer"}}>
                        <Row className="flex-nowrap g-0" style={{ height: "30vh"}}> 
                        <Col  style={{ height: "30vh"}} className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <Image style={{height: "100%", width: "100%"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/EmpireStatePlazaPanorama.jpg/368px-EmpireStatePlazaPanorama.jpg" />
                        </Col>
                        <Col  className="offset-1 col-lg-5 col-md-5 ">
                            <Stack gap={3} style={{height: "100%", width: "100%"}}>
                                <h4>{nameFormatter(destination.name)}</h4>
                                <h5>{`${destination.address.street}, ${destination.address.city}, ${destination.address.state} ${destination.address.zipCode}`}</h5>
                                <h5>{trip.date} {tripTime}</h5>
                            </Stack>
                        </Col>
                        </Row>
                </Container>
            )
        })
    }

    // Navigate to Trip Detail Page on click
    const viewTripDetails = (trip, time) => {
        navigate("/riderbookingdetails", { state : { trip : trip, time : time, past: true}})
    }

    // Handles the filter option for parsing the correct trip endpoint
    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    return (
        <Container className="d-flex flex-column" style={{ position: "relative" }}>
            <Stack direction='vertical' gap={3}>
                <Row><h2 className={Styles.Title}>Past Trips</h2></Row>
                <Row className="flex-nowrap g-0" style={{position: "relative"}}>
                    <Form.Select className={Styles.FilterSelect} onChange={handleFilter}>
                        <option value="">Filter</option>
                        <option value="MONTH">This Month</option>
                    </Form.Select>
                </Row>
                <Stack gap={5}>
                    {trips?.length > 0 ?
                        displayTripHistory()
                        :
                    trips?.length === 0 ?
                        <Alert className="m-auto w-50" variant='info'><h5>There are no trips to display at this time...</h5></Alert>
                        :
                        <Spinner className="m-auto" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }  
                </Stack>
            </Stack>
        </Container>
    );
}

export default RiderHistory;