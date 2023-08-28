import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import AddLabForm from '../views/addlabform';

function LabList() {
  const [labs, setLabs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
const [selectedLab, setSelectedLab] = useState(null);
const [newLab, setNewLab] = useState({
  LabName: '',
  LabDiscountPercentage: '',
  LabPOCName: '',
  LabPOCNumber: '',
  LabStatus: '',
  LabUsername:'',
  LabPassword:'',
});
  const history = useHistory(); 

  useEffect(() => {
    async function fetchLabs() {
      try {
        const response = await fetch('https://webservice.healthlineweb.com.pk/api/v2/GetLabs');
        const data = await response.json();
        const labDetails = data.GetLabsResult.LabDetails;
        setLabs(labDetails);
      } catch (error) {
        console.error('Error fetchaing data:', error);
      }
    }

    fetchLabs();
  }, []);


  const handleEdit = (lab) => {
    console.log(lab);
    setSelectedLab(lab);
    setEditMode(true);
    setShowAddForm(true); 
  };


const handleAdd = async (newLab) => {

  setEditMode(false);
  setShowAddForm(true);
  try {
   
    const response = await fetch('https://webservice.healthlineweb.com.pk/api/v2/AddLab', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLab),
    });

    if (response.ok) {
      
      const updatedResponse = await fetch('https://webservice.healthlineweb.com.pk/api/v2/GetLabs');
      const updatedData = await updatedResponse.json();
      const updatedLabDetails = updatedData.GetLabsResult.LabDetails;
      setLabs(updatedLabDetails);
      setSelectedLab(null);
      setShowAddForm(false);
      setEditMode(false);
      
    } else {
      console.error('Error adding lab data to the backend');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  const handleAddCancel = () => {
    // history.push('/');
    // setShowAddForm(false); 
    // setSelectedLab(null);
    setShowAddForm(false);
  setSelectedLab(null);
  setEditMode(false);
  setNewLab({ // Reset the form input fields
    LabName: '',
    LabDiscountPercentage: '',
    LabPOCName: '',
    LabPOCNumber: '',
    LabStatus: '',
    LabUsername:'',
  LabPassword:'',
  })
}
  const handleUpdate = async (updatedLabData) => {
    try {
      console.log('Updating lab data:', updatedLabData);
      
      const response = await fetch(`https://webservice.healthlineweb.com.pk/api/v2/EditLabDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLabData),
      });
     
      
      if (response.status === 200) {
        const updatedLabs = labs.map((lab) =>
          lab.Id === updatedLabData.Id? updatedLabData: lab 
        );
        console.log('Updated labs array:', updatedLabs);
        setLabs((prevLabs) => [...prevLabs, updatedLabData]);
        setSelectedLab(null);
        setEditMode(false);
        setShowAddForm(false);
        //history.push('/admin/table');
      } 
        else {
          console.error('Failed to update lab data. Response status:', response.status);
          const responseText = await response.text();
          console.error('Response text:', responseText);
        }
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
  
    <div>
    
          
          {showAddForm && !editMode && (
        <AddLabForm
  editMode={editMode} // Pass the editMode flag
  lab={selectedLab}    // Pass the selected lab data
  onAdd={handleAdd}
  onUpdate={handleUpdate}
  onCancel={handleAddCancel}
  // onCancel={() => {
  //   setEditMode(false);
  //   setSelectedLab(null);
  // }}
/>
)}
{editMode && selectedLab && (
  <AddLabForm
    editMode={true} // For the "Edit" form
    lab={selectedLab}
    onAdd={handleAdd}
    onUpdate={handleUpdate}
    onCancel={handleAddCancel}
    // onCancel={() => {
    //   setEditMode(false);
    //   setSelectedLab(null);
    // }}
  />
)}
 {!showAddForm && (
  <>
       
       <div className='col-lg-3'>
       <h3>Lab List</h3>
      <button className="btn-search mb-3 btn-block" onClick={handleAdd}>
        Add Lab
      </button>
  
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name / Status</th>
            <th>Discount</th>
            <th>POC Details</th>
            <th>Username / Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr key={lab.Id}>
              <td>
                {lab.LabStatus === 'Active' ? (
                  <>
                    {lab.LabName}
                    <br />
                    <span className="badge bg-success">Active</span>
                  </>
                ) : (
                  <>
                    {lab.LabName}
                    <br />
                    <span className="badge bg-secondary">Inactive</span>
                  </>
                )}
              </td>
              <td>{lab.LabDiscountPercentage}%</td>
              <td>
                {lab.LabStatus === 'Active' ? (
                  <>
                    {lab.LabPOCName}
                    <br />
                    <span className="">{lab.LabPOCNumber}</span>
                  </>
                ) : (
                  <>
                    {lab.LabPOCName}
                    <br />
                    {lab.LabPOCNumber}
                  </>
                )}
              </td>
            <td>{lab.LabStatus === 'Active' ? (
                  <>
                    {lab.LabUsername}
                    <br />
                    <span className=""><small>{lab.LabPassword}</small></span>
                  </>
                ) : (
                  <>
                    {lab.LabUsername}
                    <br />
                    <small>{lab.LabPassword}</small>
                  </>
                )}</td>
              <td>
                <button className="btn-search btn-block" onClick={() => handleEdit(lab)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </div>
      </>
 )}
    </div>
  
 
 )};

export default LabList;
