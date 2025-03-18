import Styles from "../Styles/Chatbox.module.css";
import { Button, Overlay, Form, Card, Stack, Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { AccountCircle, Close } from "@mui/icons-material";
import { useUser } from "./UserContext";
import { nameFormatter } from "../Functions";
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function Chatbox({driverId, rideId, riderId, recipientName}) {

    const {user} = useUser(null);
    const[messages, setMessages] = useState([]);
    const[showChat, setShowChat] = useState(false);
    const target = useRef(null);

    const[chatMessage, setChatMessage] = useState(""); // Current message to be sent
    const[position, setPosition] = useState({x: window.innerWidth/3, y: window.innerHeight/3});
    const[isDragging, setIsDragging] = useState(false);
    const[offset, setOffSet] = useState({x: 0, y: 0});

    const[chat, setChat] = useState(null);
    const clientRef = useRef(null);

    // Connect to websocket for real-time communication
    useEffect(() => {
        const sockJSUrl = "http://localhost:8080/ws";
        const client = new StompJs.Client({
            webSocketFactory: () => new SockJS(sockJSUrl),
            onConnect: () => console.log("Connected!")
        });
        client.onConnect = () => {   
            console.log("connected");         
            client.subscribe('/topic/messages', (message) => {
                // Receive New Messages
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        };

        client.activate();
        clientRef.current = client;
        return () => {
            if(client.active)
                client.deactivate();
        }
    },[])

    // Fetches the chat if one exists otherwise creates one
    useEffect(() => {
        async function handleChat() {
            const requestBody = {
                riderId: riderId,
                driverId: driverId,
                rideId: rideId
            }
            const headers = { "Content-Type": "application/json"}
            // First finds if a chat exists
            const response = await fetch("http://localhost:8080/chats/chatexists", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestBody)
            });
            const chatExists = await response.json();
            console.log(chatExists)
            if(chatExists.exists) {
                // Fetch the existing chat
                const chatResponse = await fetch(`http://localhost:8080/chats/${chatExists.id}`, {
                    method: "GET",
                    headers: headers,
                });
                const chat = await chatResponse.json();
                setChat(chat);
            }
            else {
                // Create a new chat 
                const chatResponse = await fetch("http://localhost:8080/chats", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });
                const newChat = await chatResponse.json();
                setChat(newChat);               
            }
        }
        if(showChat)
            handleChat();
    }, [showChat, user.id, driverId, rideId, riderId])
    
    useEffect(() =>{
        if(chat !== null)
            setMessages(chat.messages);
    }, [chat])

    const displayChat = (messages) => {
        return messages.map((message, key) => {
            if(message.sender.id === user.id) {
                return(
                    // Sender
                    <Row key={key} direction="horizontal" gap={3} className="align-items-start justify-content-start"
                        style={{ padding: "16px", backgroundColor: "#228B22", color: "white", border: "1px solid white"}}>
                        <Col className="col-2"><div>{ nameFormatter(message.sender.name) }</div></Col>
                        <Col className="col-10"><div style={{whiteSpace: "normal", textAlign: "start"}}>{message.content}</div></Col>
                    </Row>
                )
            }
            else {
                // Recipient
                return(
                    <Row key={key} direction="horizontal" gap={3} className="align-items-start justify-content-start" 
                         style={{ padding: "16px", border: "1px solid", borderColor: "#228B22"}}>
                        <Col className="col-10"><div style={{whiteSpace: "normal", textAlign: "end"}}>{message.content}</div></Col>
                        <Col className="col-2 "><div>{ nameFormatter(message.sender.name)}</div></Col>
                    </Row>
                )
            }
        })
    }

    const scrollToBottomChatBox = () => {
        const chatBox = document.getElementById("chatbox");
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffSet({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }

    const handleMouseMove = (e) => {
        if(!isDragging) return;

        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    useEffect( () => {
        // Scroll page to the bottom of the chat
        if(showChat)
            scrollToBottomChatBox();
    }, [messages, showChat])

    const typeMessage = (e) => {
        setChatMessage(e.target.value);
    }

    // Send Message to the Database
    const sendMessage = (e) => {
        e.preventDefault();
        let newMessage = {
            content: chatMessage,
            timestamp: new Date().getTime(),
            sender: {
                id: user.id,
                name: user.name
            },
            chat: {
                id: chat.id
            } 
        }

        const requestBody = {
            content: newMessage.content,
            timestamp: newMessage.timestamp,
            senderId: newMessage.sender.id,
            chatId: newMessage.chat.id
        }
        
        if(clientRef.current && clientRef.current.connected) {
            // WS Send
            clientRef.current.publish({
                destination: "/app/newmessage",
                body: JSON.stringify(requestBody)
            })
        }
        //setMessages(prevMessages => [...prevMessages, newMessage])
        setChatMessage("");
    }

    return(
        <div >
            <Button ref={target} size="sm" onClick={() => setShowChat(!showChat)}>Message</Button>
            <Overlay target={target.current} show={showChat} placement="left">
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => (
                    
                    <div {...props}
                        style={{
                            position: "absolute",
                            left: position.x,
                            top: position.y,
                        }}
                        
                        >
                        <Card style={{width: "50rem"}} 
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave ={handleMouseUp}
                            onMouseDown={handleMouseDown}>
                            <Card.Body style={{textAlign: "center"}}>
                                <Card.Title className="mb-3 w-100">
                                    Chat with { nameFormatter(recipientName) }
                                    <AccountCircle style={{fontSize: "2rem", marginLeft: "1rem"}}/> 
                                    <Close className={Styles.CloseButton} onClick={() => setShowChat(!showChat)}/>
                                </Card.Title>
                                <Card.Text>
                                    <Container id="chatbox" className="mb-3" onMouseDown={(e) => e.stopPropagation()}
                                        style={{
                                            height: "30vh",
                                            border: "1px solid black",
                                            overflowY: "scroll"
                                        }}>
                                        <Stack direction="vertical">
                                            {displayChat(messages)}
                                        </Stack>
                                    </Container>
                                    <Form onSubmit={sendMessage} onMouseDown={(e) => e.stopPropagation()}>
                                    <Form.Control className="mb-3" value={chatMessage} onChange={typeMessage}
                                        />
                                    <Button type="submit" disabled={chatMessage.trim().length === 0}>Submit</Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </Overlay>
        </div>
    );
}

export default Chatbox;