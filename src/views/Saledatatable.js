// import React, { useState, useEffect } from 'react';

// // const SaleDataTable = ({ selectedPackage }) => {
// //   const [saleData, setSaleData] = useState([]);

// //   useEffect(() => {
// //     // Fetch sale data based on the selected package
// //     if (selectedPackage) {
// //       fetch(`https://webservice.healthlineweb.com.pk/api/v2/SaleData?PackageId=${selectedPackage}`)
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then(data => {
// //         setSaleData(data.SaleDataResult.SaleDataDetails);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching data:', error);
// //       });
// //   }
// // }, [selectedPackage]);
// const SaleDataTable = ({ selectedPackage, dateFrom, dateTo }) => {
//     const [saleData, setSaleData] = useState([]);
  
//     useEffect(() => {
//       // Fetch sale data based on the selected package, dateFrom, and dateTo
//       if (selectedPackage && dateFrom && dateTo) {
//         const formattedDateFrom = dateFrom.toLocaleDateString('en-US');
//         const formattedDateTo = dateTo.toLocaleDateString('en-US');
  
//         fetch(`https://webservice.healthlineweb.com.pk/api/v2/SaleData?Id=${selectedPackage}&DateFrom=${formattedDateFrom}&DateTo=${formattedDateTo}`)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             return response.json();
//           })
//           .then(data => {
//             setSaleData(data.SaleDataResult.SaleDataDetails);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       }
//     }, [selectedPackage, dateFrom, dateTo]);
  
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Active Date</th>
//           <th>Customer Name</th>
//           <th>Duration</th>
//           <th>Expiry Date</th>
//           <th>ID</th>
//           <th>Package Name</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
     
//         {saleData.map(sale => (
            
//           <tr key={sale.Id}>
//             <td>{sale.ActiveDate}</td>
//             <td>{sale.CustomerName}</td>
//             <td>{sale.Duration}</td>
//             <td>{sale.ExpiryDate}</td>
//             <td>{sale.Id}</td>
//             <td>{sale.PacakgeName}</td>
//             <td>{sale.Price}</td>
        
//           </tr>
         
//         ))}
        
//       </tbody>
      
//     </table>
//   );
// };

// export default SaleDataTable;
