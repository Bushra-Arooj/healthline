import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import PrescriptionForm from "./Prescriptionform";

const CustomHeader = ({ text }) => (
  <div className="text-center font-weight-bold h5 col-attributes">
    {text}
  </div>
);


function User() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [DateFrom, setDateFrom] = useState(null);
  const [DateTo, setDateTo] = useState(null);
  const [isDateToDisabled, setIsDateToDisabled] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    additionalNotes:'',
      day:'',
      id:'',
      medicineName:'',
      morning:'',
      night:'',
      noOfDays:'',
  });
  const [patientInfo, setpatientInfo]=useState({
    Diagnosis:'',
    Remarks:'',
    Tests:'',
    Compliant:'',
  })
  const [doctorName, setDoctorName] = useState('');
const [consultationDate, setConsultationDate] = useState('');

  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   fetchData();
  // }, []);
  const columns = [
    {
      name: <CustomHeader text="Date" />,
      selector: "ConsultationDate",
      width: "200px",
    },
    {
      name: <CustomHeader text="Doctor" />,
      selector: "DoctorName",
      width: "200px",
    },
    {
      name: <CustomHeader text="Consultation Type" />,
      selector: "ConsultationType",
      width: "200px",
    },
    {
      name: <CustomHeader text="Complaint" />,
      selector: "Compliant",
      width: "200px",
    },

    {
      name: <CustomHeader text="Action" />,
      cell: (row) => (
        <button
          className="btn-search btn-link"
          onClick={() => handlePrescriptionClick(row)}
        >
          Prescription
        </button>
      ),
      width: "100px",
    },
    
  ];
  

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handlePrescriptionClick = async (row) => {
    const presData = items.find((member) => member.id === row.id);
    setPrescriptionData(presData.ConsultationPrescribeDetails);
    setpatientInfo({
      Diagnosis: presData.Diagnosis,
      Remarks: presData.Remarks,
      Tests: presData.Tests,
      Compliant: presData.Compliant,
    });
    setShowPrescription(true);
    setDoctorName(presData.DoctorName);
    setConsultationDate(presData.ConsultationDate);

  };
  
  const handleFormCancel = () => {
    setShowPrescription(false);
  };

  const fetchData = async () => {
  
    try {
      const adjustedDateFrom = new Date(DateFrom);
      const adjustedDateTo = new Date(DateTo);
      adjustedDateTo.setDate(adjustedDateTo.getDate()+1);
      const response = await fetch(
        "https://webservice.healthlineweb.com.pk/api/v2/Consultation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ DateFrom:adjustedDateFrom, DateTo: adjustedDateTo}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const consultationDetails =data?.ConsultationResult?.ConsultationDetails || [];
        const filteredConsultations = consultationDetails.filter(
          (consultation) => new Date(consultation.ConsultationDate) >= adjustedDateFrom)
        // setIsLoaded(true);
        setItems(filteredConsultations);
        setTotalRows(filteredConsultations.length);
      
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleSearch = async () => {
    setIsLoaded(true);
    // if (DateFrom && DateTo && DateTo >= DateFrom) {
    //   setIsDateToDisabled(false);
    //   fetchData();
    // } else {
    //   setIsDateToDisabled(true);
    //   setItems([]);
    //   setTotalRows(0);
    // }
    if (DateFrom && DateTo && DateTo >= DateFrom) {
      setIsDateToDisabled(false);
      // Set loading state to true before fetching
      try {
        
        await fetchData();
        setIsLoaded(false);
       // Wait for fetchData to complete
      } catch (error) {
        setIsLoaded(false);
        // Handle errors if any
      }
       // Set loading state to false after fetching
    } else {
      setIsDateToDisabled(true);
      setItems([]);
      setTotalRows(0);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // This will update data when DateFrom or DateTo changes
console.log("this is the prescription data",prescriptionData);
  return (
    <>
<div className="App">
  <div className="container mt-4">
        {!showPrescription && (

    <div className="row">
      <div className="col-md-3">
        <DatePicker
          selected={DateFrom}
          onChange={(date) => setDateFrom(date)}
          selectsStart
          startDate={DateFrom}
          endDate={DateTo}
          maxDate={DateTo}
          placeholderText="From"
          className="form-control"
          isClearable={date}
        />
      </div>
      <div className="col-md-3">
        <DatePicker
          selected={DateTo}
          onChange={(date) => setDateTo(date)}
          selectsEnd
          startDate={DateFrom}
          endDate={DateTo}
          minDate={DateFrom}
          placeholderText="To"
          disabled={isDateToDisabled}
          className="form-control"
          isClearable={date}
        />
      </div>
      <div className="col-md-3 col-sm-5">
        <button onClick={handleSearch} className="btn-search btn-block">
          Search
        </button>
      </div>
    </div>
        )}
  </div>
        
  {showPrescription ? (
    <PrescriptionForm
      prescriptionData={prescriptionData}
      patientInfo={patientInfo}
      doctorName={doctorName}
      consultationDate={consultationDate}
      onClose={handleFormCancel}
    />
  ) : isLoaded ? (
    <div className="row">
      <div className="col-lg-12">
    <div className="text-center mt-5"><i className="fas fa-spinner fa-spin"></i></div>
    </div>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="card consultation-card">
        <div className="card-header consultation-header">
          Recent Consultations
        </div>
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          className="table table-bordered strpied-tabled-with-hover"
          responsive="true"
        />
      </div>
    </div>
  )}
</div>

    
    </>
  );
}

export default User;

