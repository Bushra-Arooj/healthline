import React, {useState, useEffect} from 'react';
import {
  Button,
  Container,
  Card,
  CardImg,
  Row,
  Col,
  Form
}
from 'react-bootstrap';
import { Input} from 'reactstrap';
import img from "../assets/img/health-line.png"


function AddLabForm({editMode, lab, onAdd,onUpdate, onCancel}) {
  const [newLab, setNewLab] = useState({
    LabName: '',
    LabDiscountPercentage: '',
    LabPOCName: '',
    LabPOCNumber: '',
    LabStatus: '',
    LabUsername:'',
    LabPassword:'',
    Id:'',
  });

  useEffect(() => {
    if (editMode && lab) {
      setNewLab({
        LabName: lab.LabName,
        LabDiscountPercentage: lab.LabDiscountPercentage,
        LabPOCName: lab.LabPOCName,
        LabPOCNumber: lab.LabPOCNumber,
        LabStatus: lab.LabStatus,
        LabUsername:lab.LabUsername,
        LabPassword:lab.LabPassword,
        Id:lab.Id,
      });
    }
  }, [editMode, lab]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLab((prevLab) => ({ ...prevLab, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedLabData = {
      LabName: newLab.LabName,
      LabDiscountPercentage: newLab.LabDiscountPercentage,
      LabPOCName: newLab.LabPOCName,
      LabPOCNumber: newLab.LabPOCNumber,
      LabStatus: newLab.LabStatus,
      LabUsername:newLab.LabUsername,
      LabPassword:newLab.LabPassword,
      Id:newLab.Id,
    };

    if (editMode) {
      await onUpdate(updatedLabData); 
    } else {
      await onAdd(updatedLabData); 
    }

    setNewLab({
      LabName: '',
      LabDiscountPercentage: '',
      LabPOCName: '',
      LabPOCNumber: '',
      LabStatus: '',
      LabUsername:'',
      LabPassword:'',
      Id:'',
    });
  
  };
  return (
    <>

    <Container fluid>

      <Row className='d-flex justify-content-center align-items-center'>

        <Col lg='8'>

          <Card className='my-5 rounded-3' style={{maxWidth: '600px'}}>
          <div className="justify-content-center text-center ">
          <h2 className="fw-bold align-items-center justify-content-center img-fluid"><img src={img} width={250} height={60}/></h2>
</div>
            <Card.Body className='px-5'>

              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">{editMode ? 'Edit' : 'Add New Lab'}</h3>

              <Form onSubmit={handleSubmit}>
    
    <Form.Group>
      <Form.Label>Lab Name</Form.Label>
      <Form.Control
        type="text"
        id="LabName"
        name="LabName"
        value={newLab.LabName}
        onChange={handleInputChange}
       
      />
      </Form.Group>
      
      <Form.Group>
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control
          type="text"
          id="LabDiscountPercentage"
          name="LabDiscountPercentage"
          value={newLab.LabDiscountPercentage}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Lab POC Name</Form.Label>
        <Form.Control
          type="text"
          id="LabPOCName"
          name="LabPOCName"
          value={newLab.LabPOCName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Lab POC Number</Form.Label>
        <Form.Control
          type="text"
          id="LabPOCNumber"
          name="LabPOCNumber"
          value={newLab.LabPOCNumber}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
       
        <Form.Control
          type="hidden"
          id="Id"
          name="Id"
          value={newLab.Id}
          onChange={handleInputChange}
        />
        
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          id="LabUsername"
          name="LabUsername"
          value={newLab.LabUsername}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          id="LabPassword"
          name="LabPassword"
          value={newLab.LabPassword}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Lab Status</Form.Label>
        <div>
    <div className="form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="activeCheckbox"
        name="LabStatus"
        value="Active"
        checked={newLab.LabStatus === 'Active'}
        onChange={handleInputChange}
      />
      <label className="form-check-label">
        Active
      </label>
    </div>
    <div className="form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="inactiveCheckbox"
        name="LabStatus"
        value="Inactive"
        checked={newLab.LabStatus === 'Inactive'}
        onChange={handleInputChange}
      />
      <label className="form-check-label">
        Inactive
      </label>
    </div>
  </div>
      </Form.Group>
      <button type="submit" className="btn-search mt-3">
        {editMode ? 'Update' : 'Add'}
      </button>
      <button type="button" className="btn-search ml-3 mt-2" onClick={onCancel}>
        Cancel
      </button>
    </Form>
            </Card.Body>
          </Card>

        </Col>
      </Row>

    </Container>
   </>
  );
}

export default AddLabForm;