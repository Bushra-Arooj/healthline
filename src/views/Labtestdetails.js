import React from "react";
import { Card, Table,Row, Col } from "react-bootstrap";

const LabTestDetails = ({ selectedLabTestDetails, selectedRowData }) => {
  console.log("selected row data", selectedRowData);
  const {
    DateTime,
    Id,
    LabName,
    PatientName,
    TotalAmount,
    TotalDiscountAvailed,
    TotalPaid,
 } = selectedRowData;
  console.log(DateTime,Id,LabName);
  return (
    <div>
         <Row>
      <Col lg={6}>
      <Card>
        <Card.Header className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 fw-bold">Lab Test Details</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Name</th>
                <th>Relation</th>
                <th>Price of Test</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {selectedLabTestDetails.map((testDetail, index) => (
                <tr key={index}>
                  <td>{testDetail.TestName}</td>
                  <td>{testDetail.Name}</td>
                  <td>{testDetail.Relation}</td>
                  <td>{testDetail.PriceOfTest}</td>
                  <td>{testDetail.Discount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
</Col>
<Col lg={6}>
      {selectedRowData && (
        <Card className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 fw-bold">
          <Card.Header>Lab Test Data</Card.Header>
          <Card.Body>
            <Table>
              <tbody>
                {Object.keys(selectedRowData).map((key) => (
                  <tr key={key}>
                    <td><b>{key.split(/(?=[A-Z])/).join(" ")}</b></td>
                    <td>{selectedRowData[key]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
    

      )}
      </Col>
</Row>
    </div>
  );
};

export default LabTestDetails;
