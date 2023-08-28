import React, {useState} from 'react';
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

function AddLabForm(onAdd, onCancel, history ) {
  const [newLab, setNewLab] = useState({
    LabName: '',
    LabDiscountPercentage: '',
    LabPOCName: '',
    LabPOCNumber: '',
    LabStatus: 'Active',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLab((prevLab) => ({ ...prevLab, [name]: value }));
  };

  const handleAdd = () => {
    onAdd(newLab);
    setNewLab({
      LabName: '',
      LabDiscountPercentage: '',
      LabPOCName: '',
      LabPOCNumber: '',
      LabStatus: 'Active',
    });
    history.push('/');
  };
  return (
    <Container fluid>

      <Row className='d-flex justify-content-center align-items-center'>

        <Col lg='8'>

          <Card className='my-5 rounded-3' style={{maxWidth: '600px'}}>
            <CardImg src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top'  alt="Sample photo"/>

            <Card.Body className='px-5'>

              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add New Lab</h3>
              <Input wrapperClass='mb-4' label='Name' id='form1' type='text'/>

              <Form>
    
    <Form.Group>
      <Form.Label>Lab Name</Form.Label>
      <Form.Control
        type="text"
        id="LabName"
        name="LabName"
        value={newLab.LabName}
        onChange={handleInputChange}
        className="form-control-sm"
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
        <Form.Label>Lab Status</Form.Label>
        <Form.Control
          type="text"
          id="LabStatus"
          name="LabStatus"
          value={newLab.LabStatus}
          onChange={handleInputChange}
        />
      </Form.Group>
      {/* Add more input fields for other lab details */}
      <Button className='btn-search mt-3' onClick={handleAdd}>
        Add
      </Button>
    </Form>
            </Card.Body>
          </Card>

        </Col>
      </Row>

    </Container>
  );
}

export default AddLabForm;