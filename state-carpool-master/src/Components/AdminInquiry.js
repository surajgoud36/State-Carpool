import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "../Styles/AdminInquiry.module.css"; // Import the CSS module

const AdminInquiry = () => {
  const [selectedInquiry, setSelectedInquiry] = useState({
    title: "Lost Item",
    description:
      "I think I lost my handbag in one of the cars. I would like you to let me know how to retrieve it. Please get back to me sooner!",
  });
  const [response, setResponse] = useState(""); // For managing admin response

  const inquiries = [
    {
      id: 1,
      user: "Alia",
      title: "Lost Item",
      description:
        "I think I lost my handbag in one of the cars. I would like you to let me know how to retrieve it.",
    },
    {
      id: 2,
      user: "Ajent",
      title: "Angry Driver",
      description:
        "The driver was extremely rude and unprofessional. Please take immediate action.",
    },
    {
      id: 3,
      user: "Blue",
      title: "Kid Menace",
      description:
        "Children in the car were very noisy and disturbing. It was hard to focus on work.",
    },
  ];

  // Handle the response change
  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  // Handle sending the response (could be extended to send to backend)
  const handleSendResponse = () => {
    if (response.trim()) {
      alert(`Response sent: ${response}`);
      setResponse(""); // Clear response field after sending
    } else {
      alert("Please write a response before sending.");
    }
  };

  return (
    <Container id="inquiry_section" fluid="lg" className={` ${styles.pageContainer}`} style={{marginTop: "-8%", paddingTop: "10%"}}>
      {/* Header */}
      <Row className="mb-4 justify-content-center">
        <Col md={10}>
          <h2 className="text-center">Inquiries</h2>
          <hr />
        </Col>
      </Row>

      <Row className="justify-content-center">
        {/* Left Sidebar - Inquiries */}
        <Col md={4} className={styles.inquiriesSidebar}>
          <h4 className="fw-bold mb-3">Inquiries</h4>

          <div className={styles.inquiriesList}>
            {inquiries.map((inquiry) => (
              <Card
                key={inquiry.id}
                className={`mb-2 p-2 ${styles.inquiryCard}`}
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div>
                  {/* Icon and Username */}
                  <div className="d-flex align-items-center mb-2">
                    <div className={styles.inquiryAvatar + " me-2"}>
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <h6 className="mb-0">{inquiry.user}</h6>
                  </div>
                  {/* Title and Description */}
                  <strong>{inquiry.title}</strong>
                  <p className="text-muted mb-0">
                    {inquiry.description.slice(0, 40)}...
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Col>

        {/* Right Content - Selected Inquiry */}
        <Col md={6}>
          <Card className="p-4">
            <h4>{selectedInquiry.title}</h4>
            <p>{selectedInquiry.description}</p>

            <hr />
            <h5>Response</h5>
            <Form>
              <Form.Group controlId="responseTextarea">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Input text"
                  className="mb-3"
                  value={response}
                  onChange={handleResponseChange}
                />
              </Form.Group>
              <Button
                variant="secondary"
                className="px-4"
                onClick={handleSendResponse}
              >
                Send
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminInquiry;
