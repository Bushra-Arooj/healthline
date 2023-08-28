
import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabTestDetails from "./Labtestdetails";

const Icons = () => {
  const [lablists, setLablists] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState("");
  const [labTestData, setLabTestData] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [selectedLabTestDetails, setSelectedLabTestDetails] = useState([]);
  const [showLabTestDetails, setShowLabTestDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null); // Added this line


  useEffect(() => {
    // Fetch lab data from the API
    fetch("https://webservice.healthlineweb.com.pk/api/v2/GetLabs")
      .then((response) => response.json())
      .then((data) => {
        setLablists(data.GetLabsResult.LabDetails);
      });
  }, []);

  const fetchLabTestData = () => {
    if (selectedLabId && dateFrom && dateTo) {
      const requestData = {
        LabId: selectedLabId,
        DateFrom: dateFrom.toLocaleDateString(),
        DateTo: dateTo.toLocaleDateString(),
      };

      fetch("https://webservice.healthlineweb.com.pk/api/v2/GetLabTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.GetLabTestResult.ResponseCode === "0000") {
            setLabTestData(data.GetLabTestResult.LabTest);
          } else {
            console.error(
              "Error fetching lab test data:",
              data.GetLabTestResult.Message
            );
          }
        });
    }
  };

  const fetchLabTestDetails = (labTestId) => {
    const requestData = {
      Id: labTestId,
    };

    fetch("https://webservice.healthlineweb.com.pk/api/v2/GetLabTestDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.GetLabTestDetailsResult.ResponseCode === "0000") {
          setSelectedLabTestDetails(data.GetLabTestDetailsResult.LabTestDetails);
        } else {
          console.error(
            "Error fetching lab test details data:",
            data.GetLabTestDetailsResult.Message
          );
        }
      });
  };
  const handleLabTestButtonClick = (testRecord) => {
    fetchLabTestDetails(testRecord.Id);
    setSelectedRowData(testRecord);
    setShowLabTestDetails(true);
  };
  const handleCancelClick = () => {
    setShowLabTestDetails(false);
    setSelectedLabTestDetails([]);
    setSelectedRowData(null);
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={3} sm={12} className="mb-3">
          <select
            className="form-control"
            onChange={(e) => setSelectedLabId(e.target.value)}
          >
            <option value="">Select a Lab</option>
            {lablists.map((lab) => (
              <option key={lab.Id} value={lab.Id}>
                {lab.LabName}
              </option>
            ))}
          </select>
        </Col>
        <Col lg={3} sm={6} className="mb-3">
          <DatePicker
            className="form-control"
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            isClearable={true}
            placeholderText="From"
            startDate={dateFrom}
            endDate={dateTo}
            maxDate={dateTo}
          />
        </Col>
        <Col lg={3} sm={6} className="mb-3">
          <DatePicker
            className="form-control"
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            isClearable={true}
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            minDate={dateFrom}
            placeholderText="To"
          />
        </Col>
        <Col lg={3} sm={12} className="mb-3">
          <Button
            className="btn-search btn-block"
            onClick={() => {
              setLabTestData([]);
              setSelectedLabTestDetails([]); 
              fetchLabTestData();
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <h3>Lab Test Data</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>ID</th>
                <th>Lab Name</th>
                <th>Patient Name</th>
                <th>Total Amount</th>
                <th>Total Discount Availed</th>
                <th>Total Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {labTestData.map((testRecord, index) => (
                <tr key={index}>
                  <td>{testRecord.DateTime}</td>
                  <td>{testRecord.Id}</td>
                  <td>{testRecord.LabName}</td>
                  <td>{testRecord.PatientName}</td>
                  <td>{testRecord.TotalAmount}</td>
                  <td>{testRecord.TotalDiscountAvailed}</td>
                  <td>{testRecord.TotalPaid}</td>
                  <td>
                    <button
                      className="btn-search btn-block"
                      onClick={() => handleLabTestButtonClick(testRecord)}
                    >
                      Lab Test
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col> 
      </Row> */}
      {showLabTestDetails ? (
        <Row>
          <Col>
            <LabTestDetails
              selectedLabTestDetails={selectedLabTestDetails}
              selectedRowData={selectedRowData}
            />
             <Button className="btn-search btn-block mt-3" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Col>
        </Row>
       ) :  <Row>
       <Col>
         <h3>Lab Test Data</h3>
         <Table striped bordered hover>
           <thead>
             <tr>
               <th>Date & Time</th>
               <th>ID</th>
               <th>Lab Name</th>
               <th>Patient Name</th>
               <th>Total Amount</th>
               <th>Total Discount Availed</th>
               <th>Total Paid</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             {labTestData.map((testRecord, index) => (
               <tr key={index}>
                 <td>{testRecord.DateTime}</td>
                 <td>{testRecord.Id}</td>
                 <td>{testRecord.LabName}</td>
                 <td>{testRecord.PatientName}</td>
                 <td>{testRecord.TotalAmount}</td>
                 <td>{testRecord.TotalDiscountAvailed}</td>
                 <td>{testRecord.TotalPaid}</td>
                 <td>
                   <button
                     className="btn-search btn-block"
                     onClick={() => handleLabTestButtonClick(testRecord)}
                   >
                     Lab Test
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </Table>
       </Col> 
     </Row>}
      {/* {selectedLabTestDetails.length > 0 && (
        <Row>
          <Col>
           
            <Table striped bordered hover>
            {selectedLabTestDetails.length > 0 && (
        <Row>
          <Col>
            <LabTestDetails selectedLabTestDetails={selectedLabTestDetails} />
          </Col>
        </Row>
      )} */}
              {/* <thead>
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
              </tbody> */}
            {/* </Table> */}
      {/* //     </Col> */}
      {/* //   </Row> */}
      {/* // )} */}
    </Container>
  );
};

export default Icons;
