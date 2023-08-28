
// import React, { useState, useEffect } from 'react';

// const PackageDropdown = () => {
//   const [packages, setPackages] = useState([]);
//   const [selectedPackageId, setSelectedPackageId] = useState('');
//   const [saleData, setSaleData] = useState([]);
//   const [dateFrom, setDateFrom] = useState('05/01/2023');
//   const [dateTo, setDateTo] = useState('08/05/2023');

//   useEffect(() => {
//     // Fetch package data from the API
//     fetch('https://webservice.healthlineweb.com.pk/api/v2/GetPackages')
//       .then(response => response.json())
//       .then(data => {
//         setPackages(data.GetPackagesResult.PackagesDetails);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedPackageId) {
//       fetchSaleData();
//     }
//   }, [selectedPackageId, dateFrom, dateTo]);

//   const fetchSaleData = () => {
//     const requestData = {
//       PackageId: selectedPackageId,
//       DateFrom: dateFrom,
//       DateTo: dateTo
//     };
// console.log("dateto",dateTo)
// console.log("datefrom",dateFrom)
   
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
//         const allSaleData = data.SaleDataResult.SaleDataDetails;
  
//         if (!dateFrom && !dateTo) {
//           // Show all data when no package is selected
//           setSaleData(allSaleData);
//         } else {
//           const filteredData = allSaleData.filter(saleRecord => {
//             const saleDate = new Date(saleRecord.ActiveDate);
//             const startDate = dateFrom ? new Date(dateFrom) : null;
//             const endDate = dateTo ? new Date(dateTo) : null;
           
//             // If both startDate and endDate are null, show all data
//             if (!startDate && !endDate) {
//               return true;
//             }
  
//             // Filter data based on date range
//             return (!startDate || saleDate >= startDate) &&
//                    (!endDate || saleDate <= endDate);
//           });
//           setSaleData(filteredData);
//         }
//       } else {
//         console.error('Error fetching sale data:', data.SaleDataResult.Message);
//       }
//     });
// };

//   return (
//     <div>
//       <select onChange={(e) => setSelectedPackageId(e.target.value)}>
//         <option value="">Select a Package</option>
//         {packages.map(pkg => (
//           <option key={pkg.id} value={pkg.id}>
//             {pkg.Name}
//           </option>
//         ))}
//       </select>

//       <table>
//         <thead>
//           <tr>
//             <th>Active Date</th>
//             <th>Customer Name</th>
//             <th>Duration</th>
//             <th>Expiry Date</th>
//             <th>Id</th>
//             <th>Package Name</th>
//             <th>Price</th>

//           </tr>
//         </thead>
//         <tbody>
//           {saleData.map((saleRecord, index) => (
//             <tr key={index}>
//               <td>{saleRecord.ActiveDate}</td>
//               <td>{saleRecord.CustomerName}</td>
//               <td>{saleRecord.Duration}</td>
//               <td>{saleRecord.ExpiryDate}</td>
//               <td>{saleRecord.Id}</td>
//               <td>{saleRecord.PacakgeName}</td>
//               <td>{saleRecord.Price}</td>
           
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PackageDropdown;
