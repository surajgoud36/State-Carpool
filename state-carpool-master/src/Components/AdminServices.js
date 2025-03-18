import { useState, useEffect } from "react";
import { Container, Alert} from "react-bootstrap";

import AdminSideNavBar from "./AdminSideNavBar";
import Destinations from "./Destinations";
import AdminRoutes from "./AdminRoutes";
import AdminRide from "./AdminRide";
import AdminInquiry from "./AdminInquiry";

function AdminServices() {
    const [numNewBookings, setNumNewBookings] = useState(0);

    useEffect(() => {
        async function fetchNewBookings() {
            const headers = { 'Content-Type': 'application/json'}
            const response = await fetch('http://localhost:8080/bookings/scheduled', {headers});
            const data = await response.json();
            setNumNewBookings(data?.length);
          }
        fetchNewBookings();
    }, [])

    return (
    <div className="position-relative d-flex"> 
        <AdminSideNavBar/>
        <Container className="top-0 end-0" fluid style={{width: "90%"}}>
            <h1 className="text-center">Admin Services</h1>

            {numNewBookings > 0 && 
            <Alert className="text-center" dismissible
                    variant={numNewBookings >= 10 ? "danger" : numNewBookings >= 5 ? "warning" : 'primary'}
            ><h5><strong>You have {numNewBookings} bookings that need to be managed!</strong></h5></Alert>
            }

            <Destinations/>
            <hr />
            <AdminRoutes/>
            <hr/>
            <AdminRide/>
            <hr/>
            <AdminInquiry/>
            
        </Container>
    </div>
    );
}

export default AdminServices;