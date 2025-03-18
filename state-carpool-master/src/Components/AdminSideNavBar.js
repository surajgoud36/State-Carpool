import { Nav } from "react-bootstrap";
import { Place, Route, AirportShuttle, Message } from "@mui/icons-material";

function AdminSideNavBar() {
    return(
        <Nav sticky="top" className="position-sticky flex-column text-start justify-content-start" 
        style={{width: "10%", 
                height: "33vh", 
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                border: "1px solid #c5c5c5",
                borderTop: "none",
                paddingLeft: "8px",
                top: "8%"}}>

            <Nav.Link href="#destination_section" className="mt-4 d-flex p-0 gap-2">
                <Place style={{fontSize: "1.5rem"}}/> 
                <p style={{fontSize: "1rem"}}>Destinations</p>
            </Nav.Link>
            <hr style={{width: "80%", marginLeft: "10%", marginRight: "10%"}}/>

            <Nav.Link href="#route_section" className="d-flex p-0 gap-2">
                <Route style={{fontSize: "1.5rem"}}/> 
                <p style={{fontSize: "1rem"}}>Routes</p>
            </Nav.Link>
            <hr style={{width: "80%", marginLeft: "10%", marginRight: "10%"}}/>

            <Nav.Link href="#ride_section" className="d-flex p-0 gap-2">
                <AirportShuttle style={{fontSize: "1.5rem"}}/> 
                <p style={{fontSize: "1rem"}}>Rides</p>
            </Nav.Link>
            <hr style={{width: "80%", marginLeft: "10%", marginRight: "10%"}}/>

            <Nav.Link href="#inquiry_section" className="d-flex p-0 gap-2">
                <Message style={{fontSize: "1.5rem"}}/> 
                <p style={{fontSize: "1rem"}}>Inquiries</p>
            </Nav.Link>
        </Nav>
    )
}

export default AdminSideNavBar;
