import React from "react";
import { Container, Card, Row, Col, Table } from "react-bootstrap";
import img from "../assets/img/health-line.png";

function PrescriptionForm({ prescriptionData, onClose, patientInfo,doctorName, consultationDate }) {
  console.log(
    "this is the prescription data and this is a child",
    prescriptionData
  );

  return (
    <Container fluid>
       <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <div className="doctor-row">
            <p>{doctorName} ({consultationDate})</p>
           
            
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <Card className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
           
            <Card.Body>
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 fw-bold">Prescription</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>No. of Days</th>
                    <th>Morning + Night</th>
                    <th>Additional Notes</th>
                  </tr>
                </thead>
                <tbody>
                {prescriptionData.map((prescription, index) => (
                      <tr key={index}>
                        <td>{prescription.medicineName}</td>
                        <td>{prescription.noOfDays}</td>
                        <td>{prescription.morning} + {prescription.night}</td>
                        <td>{prescription.additionalNotes}</td>
                      </tr>))}
                </tbody>
              </Table>
              <button
                type="button"
                className="btn-search mt-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6">
          {/* Second Card - Patient Information */}
          <Card className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
            <Card.Body className="px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Patient Information</h3>
              <Row>
                <Col lg="6">
                  <strong>Diagnose:</strong>
                  <p>{patientInfo.Diagnosis}</p>
                </Col>
                <Col lg="6">
                  <strong>Remarks:</strong>
                  <p>{patientInfo.Remarks}</p>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <strong>Tests:</strong>
                  <p>{patientInfo.Tests}</p>
                </Col>
                <Col lg="6">
                  <strong>Complaint:</strong>
                  <p>{patientInfo.Compliant}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
    
      </Row>
    </Container>
  );
}

export default PrescriptionForm;
