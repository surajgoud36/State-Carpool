import Styles from '../Styles/NavigationBar.module.css';
import { Nav, Navbar, Stack, Image, NavDropdown } from 'react-bootstrap';
import { useUser } from './UserContext';
import { Home, History, AirportShuttle, Schedule } from '@mui/icons-material';

function NavigationBar() {
    const { user, role, logout } = useUser(null);

    const handleSelect = (eventKey) => {
        if(eventKey === "PROFILE") {
            window.open("profile", '_self');
        }
        else if(eventKey === "LOGOUT") {
            logout();
            window.open("/", '_self');
        }
    }

    if(user){
        if(role === "ROLE_RIDER") {
            return(
                <Navbar sticky="top" className={Styles.Navbar}>
                    <Navbar.Brand className={Styles.NavbarBrand}><img className={Styles.Logo} src="newyork.png" alt="nyslogo"></img></Navbar.Brand>
                    <Navbar.Collapse className={Styles.NavbarCollapse}>
                        <Stack direction="horizontal" gap={4} className={Styles.NavbarLinks}>
                        <Nav.Link href="riderhome">
                            <div className="d-flex" style={{flexDirection: "column", alignItems: "center"}}>
                                <Home/>
                                <h6>Home</h6>
                            </div>
                        </Nav.Link>

                        <Nav.Link href="riderhistory">
                            <div className="d-flex" style={{flexDirection: "column", alignItems: "center"}}>
                                <History/>
                                <h6>History</h6>
                            </div>
                        </Nav.Link>
                        </Stack>
                        <NavDropdown align="end" id="nav-dropdown" onSelect={handleSelect} style={{marginRight: "1vmax"}}
                            title={
                                   user.image ?
                                            <Image roundedCircle={true} src={`data:image/jpeg;base64,${user.image}`} fluid
                                                style={{cursor:"pointer", width: "3vmax", height: "3vmax", objectFit: "cover"}}
                                            />
                                     :
                                    <i style={{fontSize:"2rem", cursor:"pointer"}} className="bi bi-person-circle"></i>
                            }>
                            <NavDropdown.Item eventKey="PROFILE">Profile</NavDropdown.Item> 
                            <NavDropdown.Item eventKey="LOGOUT">Logout</NavDropdown.Item>       
                        </NavDropdown>

                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else if(role === "ROLE_DRIVER") {
            return(
                <Navbar sticky="top" className={Styles.Navbar}>
                    <Navbar.Brand className={Styles.NavbarBrand}><img className={Styles.Logo} src="newyork.png" alt="nyslogo"></img></Navbar.Brand>
                    <Navbar.Collapse className={Styles.NavbarCollapse}>
                        <Stack direction="horizontal" gap={4} className={Styles.NavbarLinks}>
                        <Nav.Link href="currentRide">
                            <div className="d-flex" style={{flexDirection: "column", alignItems: "center"}}>
                                <AirportShuttle/>
                                <h6>Ride</h6>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="upcomingRides"><div className="d-flex" style={{flexDirection: "column", alignItems: "center"}}>
                                <Schedule/>
                                <h6>Upcoming</h6>
                            </div>
                        </Nav.Link>
                        </Stack>
                        <NavDropdown align="end" id="nav-dropdown" onSelect={handleSelect} style={{marginRight: "1vmax"}}
                            title={
                                   user.image ?
                                            <Image roundedCircle={true} src={`data:image/jpeg;base64,${user.image}`} fluid
                                                style={{cursor:"pointer", width: "3vmax", height: "3vmax", objectFit: "cover"}}
                                            />
                                     :
                                    <i style={{fontSize:"2rem", cursor:"pointer"}} className="bi bi-person-circle"></i>
                            }>
                            <NavDropdown.Item eventKey="PROFILE">Profile</NavDropdown.Item> 
                            <NavDropdown.Item eventKey="LOGOUT">Logout</NavDropdown.Item>       
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else if(role === "ROLE_ADMIN") {
            return(
                <Navbar sticky="top" className={Styles.Navbar}>
                    <Navbar.Brand className={Styles.NavbarBrand}><img className={Styles.Logo} src="newyork.png" alt="nyslogo"></img></Navbar.Brand>
                    <Navbar.Collapse className={Styles.NavbarCollapse}>
                        <Nav.Link className={Styles.NavbarLinks} href="adminhome">
                            <div className="d-flex" style={{flexDirection: "column", alignItems: "center"}}>
                                <Home/>
                                <h6>Home</h6>
                            </div>
                        </Nav.Link>
                        <NavDropdown align="end" id="nav-dropdown" onSelect={handleSelect} style={{marginRight: "1vmax"}}
                            title={
                                   user.image ?
                                            <Image roundedCircle={true} src={`data:image/jpeg;base64,${user.image}`} fluid
                                                style={{cursor:"pointer", width: "3vmax", height: "3vmax", objectFit: "cover"}}
                                            />
                                     :
                                    <i style={{fontSize:"2rem", cursor:"pointer"}} className="bi bi-person-circle"></i>
                            }>
                            <NavDropdown.Item eventKey="PROFILE">Profile</NavDropdown.Item> 
                            <NavDropdown.Item eventKey="LOGOUT">Logout</NavDropdown.Item>       
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
    else {
        return(
            <Navbar sticky="top" className={Styles.Navbar} style={{backgroundColor: "#f5f5f5"}}>
                <Navbar.Brand className={Styles.NavbarBrand}><img className={Styles.Logo} src="newyork.png" alt="nyslogo"></img></Navbar.Brand>
            </Navbar>
        )
    }
}

export default NavigationBar