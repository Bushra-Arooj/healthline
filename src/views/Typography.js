import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Typography = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [saleData, setSaleData] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(() => {
    // Fetch package data from the API
    fetch('https://webservice.healthlineweb.com.pk/api/v2/GetPackages')
      .then(response => response.json())
      .then(data => {
        setPackages(data.GetPackagesResult.PackagesDetails);
      });
  }, []);

  // useEffect(() => {
  //   fetchSaleData();
  // }, [selectedPackageId, dateFrom, dateTo]);
  const fetchSaleData = () => {
    if (selectedPackageId && dateFrom && dateTo) {
      const requestData = {
        PackageId: selectedPackageId,
        DateFrom: dateFrom.toLocaleDateString(),
        DateTo: dateTo.toLocaleDateString()
      };
    // if (selectedPackageId) {
    //   const requestData = {
    //     PackageId: selectedPackageId,
    //   };
  
    //   if (dateFrom && dateTo) {
    //     requestData.DateFrom = dateFrom.toLocaleDateString();
    //     requestData.DateTo = dateTo.toLocaleDateString();
    //   }
  
      fetch('https://webservice.healthlineweb.com.pk/api/v2/SaleData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data); 
          if (data.SaleDataResult.ResponseCode === '0000') {
            setSaleData(data.SaleDataResult.SaleDataDetails);
          } 
          else {
            console.error('Error fetching sale data:', data.SaleDataResult.Message);
          }
        });
    }
  };

  const handleSearchClick = () => {
    fetchSaleData();
  };

  // const fetchSaleData = () => {
  //   if (selectedPackageId && dateFrom && dateTo) {
  //     const requestData = {
  //       PackageId: selectedPackageId,
  //       DateFrom: dateFrom.toLocaleDateString(),
  //       DateTo: dateTo.toLocaleDateString()
  //     };

  //     fetch('https://webservice.healthlineweb.com.pk/api/v2/SaleData', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(requestData)
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.SaleDataResult.ResponseCode === '0000') {
  //         setSaleData(data.SaleDataResult.SaleDataDetails);
  //       } else {
  //         console.error('Error fetching sale data:', data.SaleDataResult.Message);
  //       }
  //     });
  //   }
  // };

  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-lg-3 col-sm-12 mb-3">
        <select className="form-control" onChange={(e) => setSelectedPackageId(e.target.value)}>
          <option value="">Select a Package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-3 col-sm-6 mb-3">
    
          <DatePicker className="form-control" selected={dateFrom} onChange={date => setDateFrom(date)} isClearable={true}
          startDate={dateFrom}
          endDate={dateTo}
          maxDate={dateTo}
          placeholderText="From"
          
          />
       
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
     
          <DatePicker className="form-control" selected={dateTo} onChange={date => setDateTo(date)} isClearable={true}
           selectsEnd
           startDate={dateFrom}
           endDate={dateTo}
           minDate={dateFrom}
           placeholderText="To"
          
          />
        
      </div>
      <div className="col-md-3 col-sm-12 mb-3">

        <button className="btn-search btn-block" onClick={handleSearchClick}>Search</button>
      </div>
    </div>
    
    <h3>Sale Data</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Active Date</th>
          <th>Customer Name</th>
          <th>Duration</th>
          <th>Expiry Date</th>
          <th>Id</th>
          <th>Package Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {saleData.map((saleRecord, index) => (
          <tr key={index}>
            <td>{saleRecord.ActiveDate}</td>
            <td>{saleRecord.CustomerName}</td>
            <td>{saleRecord.Duration}</td>
            <td>{saleRecord.ExpiryDate}</td>
            <td>{saleRecord.Id}</td>
            <td>{saleRecord.PacakgeName}</td>
            <td>{saleRecord.Price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Typography;
