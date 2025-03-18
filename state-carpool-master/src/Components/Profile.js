import { Container, Row, Col, Stack, Form, Modal, Button, Image, Card, Table } from "react-bootstrap";
import { AccountCircle, Wallet, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { nameFormatter } from "../Functions";
import { useUser } from "./UserContext";

function Profile() {
    const {user, updateUser, role} = useUser(null);
    console.log(user)
    const [userData, setUserData] = useState({
        name: nameFormatter(user.name),
        password: user.password,
        workplace: nameFormatter(user.workplace),
        address: {
            street: user.address.street,
            city: user.address.city,
            state: user.address.state,
            zipCode: user.address.zipCode
        }
    });

    const [photoByteArray, setPhotoByteArray] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(() => {return user.image ? `data:image/jpeg;base64,${user.image}` : null});

    const[edit, setEdit] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
    
    const closeModal = () => {
        setEdit(false);
        setPhotoByteArray(null);
        setShowPassword(false);
    }
    const showModal = () => setEdit(true);

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const updateInformation = (e) => {
        if(e.target.name in userData.address) {
            setUserData({
                ...userData,
                address: {
                    ...userData.address,
                    [e.target.name]: e.target.value
                }
            })
        }
        else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
        }
    }

    // Handles getting the byte array data of the photo uploaded by the user
    const updatePhoto = (e) => {
        const file = e.target.files[0];
        
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert the file to a byte array
                const byteArray = new Uint8Array(reader.result);
                setPhotoByteArray(byteArray);
            }
            reader.readAsArrayBuffer(file);
        }
       
    }

    const uploadInformation = (e) => {
        e.preventDefault();
        const imageData = photoByteArray ? btoa(String.fromCharCode(...new Uint8Array(photoByteArray))) : null;

        // Upload to DB
        const handleProfileUpdate = async () => {
            const requestBody = {
                name: userData.name,
                email: user.email,
                password: userData.password,
                workplace: userData.workplace,
                address: {
                    street: userData.address.street,
                    city: userData.address.city,
                    state: userData.address.state,
                    zipCode: userData.address.zipCode
                },
                image: imageData
            } 

            try {
                const headers = { 'Content-Type': 'application/json'}
                const response = await fetch(`http://localhost:8080/users/${user.id}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
                console.log("Successfully updated user: " + response);
                const data = await response.json();
                updateUser(data);
                if(imageData !== null)
                    setPhotoUrl(`data:image/jpeg;base64,${imageData}`);
            }
            catch(error) {
                console.log("Error: " + error);
            }
        }

        handleProfileUpdate();
        closeModal();
    }

    return(
        <Container className="d-flex flex-column justify-content-center align-items-center">
            
            <Modal show={edit} onHide={closeModal} size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header className="text-center" closeButton>
                    <Modal.Title className="w-100">Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {   photoByteArray ?
                        <Image className="m-auto" src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(photoByteArray)))}`} roundedCircle={true} style={{width: "13vmax", height: "13vmax", objectFit: "cover", display: "block"}}/> :
                        user.image ?
                        <Image className="m-auto" src={`data:image/jpeg;base64,${user.image}`} roundedCircle={true} style={{width: "13vmax", height: "13vmax", objectFit: "cover", display: "block"}}/> :
                        <AccountCircle className="m-auto" style={{fontSize: "15rem", display: "block"}}/>
                    }
                    <Form onSubmit={uploadInformation}>
                        <Form.Group className="mb-3" controlId="formPhoto">
                            <Form.Label><h5>Upload Photo</h5></Form.Label>
                            <Form.Control type="file" onChange={updatePhoto}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label><h5>Name</h5></Form.Label>
                            <Form.Control name="name" value={userData.name} onChange={updateInformation}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label><h5>Password</h5></Form.Label>
                            <Stack direction="horizontal">
                                <Form.Control type={showPassword ? "" : "password"} name="password" value={userData.password} onChange={updateInformation}/>
                                {showPassword ? 
                                    <Visibility style={{fontSize: "2rem", cursor: "pointer"}} onClick={handleShowPassword}/> : 
                                    <VisibilityOff style={{fontSize: "2rem", cursor: "pointer"}}  onClick={handleShowPassword}/>
                                }
                            </Stack>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWorkplace">
                            <Form.Label><h5>Workplace</h5></Form.Label>
                            <Form.Control name="workplace" value={userData.workplace} onChange={updateInformation}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label><h5>Street</h5></Form.Label>
                            <Form.Control name="street" value={userData.address.street} onChange={updateInformation}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label><h5>City</h5></Form.Label>
                            <Form.Control name="city" value={userData.address.city} onChange={updateInformation}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label><h5>State</h5></Form.Label>
                            <Form.Control name="state" value={userData.address.state} onChange={updateInformation}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label><h5>Zip Code</h5></Form.Label>
                            <Form.Control name="zipCode" value={userData.address.zipCode} onChange={updateInformation}/>
                        </Form.Group>

                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button type="submit" className="bg-success">Save</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Card className="mt-4 shadow-lg p-3 mb-5 bg-body rounded">
                <Card.Header>
                {   photoUrl ?
                            <Image src={photoUrl} thumbnail={true} style={{width: "100%", height: "100%", objectFit: "cover"}}/> :
                            <AccountCircle className="m-auto" style={{fontSize: "15rem", display: "block"}}/>
                }
                <Card.Title className="text-center"><h2>{user.name}</h2></Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label><h5>Workplace</h5></Form.Label>
                        <h4>{user.workplace}</h4>
                    </Form.Group>
                    <hr/>

                    <Form.Group>
                        <Form.Label><h5>Address</h5></Form.Label>
                        <h4>{`${nameFormatter(user.address.street)}, ${nameFormatter(user.address.city)}, ${nameFormatter(user.address.state)} ${user.address.zipCode}`}</h4>
                    </Form.Group>
                    <hr/>
                    {
                        role === "ROLE_RIDER" ?
                        <Form.Group>
                            <Form.Label><h5>Subscription</h5></Form.Label>
                            <Stack direction="horizontal" gap={5}>
                                <h4>{`Valid until ${user.subscription.endDate}`}</h4>
                                <Stack direction="horizontal" gap={2} onClick={() => {window.open("subscription",'_self')}} 
                                                className="justify-content-center align-items-center bs-green ms-2 me-2" 
                                                style={{cursor: "pointer", position: "relative", zIndex: "10"}}>
                                            <h5 style={{color: "white"}}>Renew</h5>
                                            <Wallet style={{fontSize: "2rem", color: "white", cursor: "pointer"}}/>
                                            <div style={{position: "absolute", width: "100%", height: "100%", background: "green", zIndex: "-1", borderRadius: 4}}/>
                                </Stack>
                            </Stack>
                        </Form.Group>
                        :
                        null
                    }
                
                </Card.Body>
                <Card.Footer className="p-0">
                    <Stack direction="horizontal" gap={2} onClick={showModal} 
                            className="justify-content-center align-items-center bs-green" 
                            style={{cursor: "pointer", position: "relative", zIndex: "10"}}>
                        <h3 style={{color: "white"}}>Edit</h3>
                        <Edit style={{fontSize: "2.5rem", color: "white", cursor: "pointer"}}/>
                        <div style={{position: "absolute", width: "100%", height: "100%", background: "green", zIndex: "-1"}}/>
                    </Stack>   
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default Profile;