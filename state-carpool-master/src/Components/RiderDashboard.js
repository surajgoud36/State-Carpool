import {Container, Row, Col, Button, ButtonGroup, Form, Carousel, Stack, Card, Modal, Alert, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/RiderDashboard.module.css';
import Spacer from './Spacer';
import {ArrowBackIosNew, ArrowForwardIos, Check, Error}  from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { dateFormatter } from '../Functions';
import { useUser } from './UserContext';

function RiderDashboard() {
    const [tripType, setTripType] = useState("dropoff"); // dropoff or pickup
    const[booking, setBooking] = useState({
        destination: null,
        date: "",
        time: ""
    });
    const [showSuccessfulBooking, setShowSuccessfulBooking] = useState(false);
    const [bookingExists, setBookingExists] = useState(false);
    const[destinations, setDestinations] = useState([]);
    const[trips, setTrips] = useState(null);
    const{user} = useUser(null);
    const navigate = useNavigate();

    useEffect(() => {
        let today = new Date();

        if(user.subscription === undefined || user.subscription === null) {
            // Must renew subscription
            navigate("/subscription");
        }

        let subscriptionDate = new Date(user?.subscription?.endDate);

        if(today > subscriptionDate) {
            // Must renew subscription
            navigate("/subscription");
        }
    }, [user])

    // Fetches all destinations that can be booked and all booked trips associated with the user
    useEffect(() => {
        async function fetchDestinations() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch('http://localhost:8080/destinations', {headers});
            const data = await response.json();
            setDestinations(data);
        }

        async function fetchTrips() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch(`http://localhost:8080/bookings/user/${user.id}`, {headers});
            const data = await response.json();
            
            setTrips(data);
        }

        fetchDestinations();
        fetchTrips();
    }, [user.id])

    // Timeout the successful booking modal indicator after time seconds
    useEffect(() => {
        let timeout;
        if(showSuccessfulBooking) {
            const time = 5000;
            timeout = setTimeout(() => {
                setShowSuccessfulBooking(false);
                clearBookingFields();
            }, time)
        }
        return() => {
            clearTimeout(timeout);
        }
    }, [showSuccessfulBooking])

    // Sets the type of ride the user wishes to book
    const handleTripType = (e) => {
        let type = e.target.value;
        setTripType(type);
        if(booking?.destination !== null) {
            let destinationTime = type === "dropoff" ? booking?.destination.dropoffTime : booking?.destination.pickupTime;
            setBooking({
                ...booking,
                ["time"]: destinationTime
            })
        }
    }

    // Sets selected destination and time the user wishes to book
    const handleBookingSelect = (e) => {
        if(e.target.value === "") {
            setBooking({
                destination: null,
                date: "",
                time: ""
            });
            return;
        }
        let destination = destinations[e.target.value];
        let destinationTime = tripType === "dropoff" ? destination.dropoffTime : destination.pickupTime;
        setBooking({
            ...booking,
            [e.target.name]: destination,
            ["time"]: destinationTime
        });
    }

    // Sets the booking date the user wishes to book
    const handleBookingDatePicker = (e) => {
        let date = dateFormatter(e.target.value);
        setBooking({
            ...booking,
            [e.target.name]: date
        })
    }

    // Clear the fields after making a booking
    const clearBookingFields = () => {
        setBooking({
            destination: null,
            date: "",
            time: ""
        });

        let date_input = document.getElementById('booking-date');
        date_input.value = "";
        // For older browsers
        if(date_input.type === 'date') {
            date_input.type = 'text';
            date_input.type = 'date';
        }

        let destination_input = document.getElementById('destination-select');
        destination_input.value = "";
    }

    // Makes a post request to create a booking for the user. Requires admin to assign a ride before showing up under upcoming trips.
    const handleBooking = async () => {
        if(booking?.destination === null || booking?.date === "")
            return;
        let todaysDate = new Date().toLocaleDateString();
        
        const requestBody = {
            rideType: tripType,
            destinationId: booking.destination.id,
            riderId: user.id,
            date: booking.date,
            createdAt: todaysDate
        }
        
        try {
            const headers = { 'Content-Type': 'application/json'}

            //First check if the booking exists
            const existsResponse = await fetch('http://localhost:8080/bookings/userbookingexists', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            })
            const exists = await existsResponse.json();
            if(!exists) {
                // Make a new booking
                const response = await fetch('http://localhost:8080/bookings', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
                console.log("Successfully created booking: " + response);
                setBookingExists(false);
                setShowSuccessfulBooking(true);
            }
            else {
                console.log(exists)
                // Display booking failed
                setBookingExists(true);
                setShowSuccessfulBooking(true);
            }
        }
        catch(error) {
            console.log("Error: " + error);
        }
    }

    // Shows the details page for an upcoming trip
    const viewTripDetails = (trip, time) => {
        navigate("/riderbookingdetails", { state : { trip : trip, time : time, past: false}})
    }

    // Creates the view of upcoming scheduled bookings in the carousel
    const displayUpcomingTrips = () => {
        const numTrips = trips.length;
        const numCarouselItems = Math.ceil(numTrips/3);
        const carouselItems = [];

        for(let i = 0; i < numCarouselItems; i++) {
            const start = i * 3;
            const end = Math.min(start + 3, numTrips);
            
            carouselItems.push(
                <Carousel.Item key={i}>
                    <Stack gap={3} direction={"horizontal"}>
                    {trips.slice(start, end).map((trip, key) => {
                        let destination = trip.destination;
                        let rideType = trip.rideType.toUpperCase();
                        let time = trip.rideType === "dropoff" ? destination.dropoffTime : destination.pickupTime;
                    return (
                        <Card key={key} className={Styles.TripCard} onClick={() => viewTripDetails(trip, time)}>
                        <Card.Img className={Styles.TripCardImage} variant='top' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/EmpireStatePlazaPanorama.jpg/368px-EmpireStatePlazaPanorama.jpg"}/>
                        <Card.Body>
                            <Card.Title>{destination.name}</Card.Title>
                            <Card.Text as="div">
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div>
                                {time + "\t\t"}
                                {rideType}
                                </div>
                                {trip.date}
                                </div>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    ) })}
                    </Stack>
                </Carousel.Item>
            )
        }
        
        return(
            <Carousel className={Styles.Carousel} interval={null} touch={true} indicators={false}
                        prevIcon={<ArrowBackIosNew style={{marginRight: "15vmax", fontSize: "4rem", color: "black"}}/>} 
                        nextIcon={<ArrowForwardIos style={{marginLeft: "15vmax", color: "black", fontSize: "4rem"}}/>}>
                    {carouselItems}
            </Carousel>
        )
    }
                        
    return(
        <Container className={Styles.Container}>
            <h2 className={Styles.Title}>Let's Get To Work!</h2>
            <Stack gap={4}>
                <Row className="flex-nowrap g-0">
                    <Spacer width={10}/>
                    <Col><h3 className={Styles.SubTitle}>BOOK A TRIP</h3></Col>
                </Row>
                <Row className="flex-nowrap g-0">
                    <Spacer width={75}/>
                    <Col><ButtonGroup className={`${Styles.ScheduleTripToggle}`}>
                            <Button value={"dropoff"} className={Styles.Button} variant={tripType === "dropoff" ? "dark" : "outline-dark"}
                            onClick={handleTripType}>Drop Off</Button>
                            <Button value={"pickup"} className={Styles.Button} variant={tripType === "pickup" ? "dark" : "outline-dark"}
                            onClick={handleTripType}>Pick Up</Button>
                        </ButtonGroup>
                    </Col>
                    <Spacer width={5}/>
                </Row>
                <Row className='flex-nowrap g-0'>
                    <Spacer width={10}/>
                    <Col xs="2" md="2" lg="2"><h5>Destination</h5></Col>
                    <Col>
                        <Form.Select id="destination-select" name="destination" className={Styles.DestinationSelect} onChange={handleBookingSelect} defaultValue={""}>
                            <option key="DEFAULT" value="" disabled>Select a destination</option>
                            {
                                destinations.length > 0 &&
                                destinations.map((destination, key) => {
                                    return(<option key={key} value={key}>{destination.name}</option>)
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Spacer width={2}/>
                    <Col xs="2" md="2" lg="2">
                    { booking?.destination !== null ?
                    <Stack direction="horizontal" gap={4}>
                        <h5>Time</h5>
                        <h5 style={{border: "1px solid #cccccc", backgroundColor: "white", padding: ".375rem 2.25rem .375rem .75rem", lineHeight: "1.5", fontSize: "1rem"}}>
                            {booking?.time}
                        </h5>
                    </Stack>
                    : null
                    }
                    </Col>
                    <Spacer width={5}/>
                </Row>

                <Row>
                    <Spacer width={10}/>
                    <Col xs="2" md="2" lg="2"><h5>Booking Date</h5></Col>
                    <Col>
                        <Form.Control id="booking-date" type="date" name="date" onChange={handleBookingDatePicker} >

                        </Form.Control>
                    </Col>
                    <Spacer width={5}/>
                </Row>
                
                <Row className='justify-content-center flex-nowrap g-0'>
                    <Col align="center">
                        <Button className={Styles.Button} variant="dark" onClick={handleBooking}>
                            Book
                        </Button>
                    </Col>
                </Row>
            </Stack>

            <Modal show={showSuccessfulBooking} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="text-center">
                    <Modal.Title className="w-100">{!bookingExists ? "Successfully Booked!" : "Booking Failed..."}</Modal.Title>
                    {!bookingExists ?
                        <Check style={{color: "green", fontSize: "2rem"}}/> :
                        <Error style={{color: "red", fontSize: "2rem"}}/>
                    }
                </Modal.Header>
                <Modal.Body>
                    {!bookingExists ?
                        `Your booking for ${booking?.destination?.name} on ${booking?.date} is successful. More details will come soon once the booking has been approved...` :
                        `You already booked a trip to ${booking?.destination?.name} on ${booking?.date}!`
                    }
                </Modal.Body>
            </Modal>
            
            {   trips?.length > 0 ?
                <Stack gap={4}>
                    <Row className='flex-nowrap g-0'>
                        <Spacer width={10}/>
                        <Col><h3 className={Styles.SubTitle}>UPCOMING TRIPS</h3></Col>
                    </Row>
                    
                    {displayUpcomingTrips()}
                    
                </Stack>
                :
                trips?.length === 0 ?
                <Alert className="mt-5 w-50 m-auto" variant='info'><h5>There are no upcoming trips for today...</h5></Alert>
                :
                <Spinner className="m-auto" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            
        </Container>
    );
}

export default RiderDashboard;