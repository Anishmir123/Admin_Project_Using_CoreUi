
// import React, { useEffect, useRef } from 'react';
// import $ from 'jquery';
// import 'datatables.net'; // Import DataTables functionality
// import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
// // import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

// const ButtonGroups = () => {
//   const tableRef = useRef(null);

//   useEffect(() => {
//     // Initialize the DataTable on component mount
//     const table = $(tableRef.current).DataTable({
//       processing: true,
//       serverSide: true,
//       ajax: {
//         url: 'http://127.0.0.1:3007/api/auth/studentFormData',
//         dataSrc: 'data',
//         error: function(xhr, error, thrown) {
//           console.error('AJAX Error:', xhr.responseText);
//         }
//       },
//       columns: [
//         { data: 'id' },
//         { data: 'email' },
//         { data: 'city' },
//         { data: 'country' },
//         { data: 'hobbies' },
//         { data: 'gender' }
//       ]
//     });
    
    

//     // Cleanup DataTable instance on unmount
//     return () => {
//       table.destroy(true);
//     };
//   }, []);

//   return (
//     <div>
//       <table ref={tableRef} className="display" width="100%">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Email</th>
//             <th>City</th>
//             <th>Country</th>
//             <th>Hobbies</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Table rows will be dynamically populated by DataTables */}
//         </tbody>
//         <br/>
//       </table>
//       <br />
//     </div>
//   );
// };

// export default ButtonGroups;

import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

const ButtonGroups = () => {
  const tableRef = useRef(null); // Reference to the table DOM element
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage items per page

  // Handle dropdown changes for items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10)); // Update state when dropdown value changes
  };

  useEffect(() => {
    // Initialize DataTable
    const tableInstance = $(tableRef.current).DataTable({
      processing: true,
      serverSide: true,  // Enable server-side processing
      ajax: {
        url: 'http://127.0.0.1:3007/api/auth/studentFormData',
        type: 'GET',
        data: (d) => ({
          draw: d.draw,     // Required by DataTables for pagination
          start: d.start,   // Pagination: start index of current page
          length: d.length, // Pagination: number of records per page
        }),
        dataSrc: 'data', // Extract data array from the API response
      },
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'email', title: 'Email' },
        { data: 'city', title: 'City' },
        { data: 'country', title: 'Country' },
        { data: 'hobbies', title: 'Hobbies' },
        { data: 'gender', title: 'Gender' },
      ],
      pageLength: itemsPerPage, // Set the number of items per page
      lengthMenu: [5, 10, 15, 20], // Dropdown options for items per page
      destroy: true, // Allow reinitialization of DataTable instance
      responsive: true, // Enable responsive table
      serverSide: true,  // Enabling server-side processing
      drawCallback: function(settings) {
        const { recordsTotal, recordsFiltered } = settings;
        console.log('Total Records:', recordsTotal);
        console.log('Filtered Records:', recordsFiltered);
      },
      search: { // Ensure that searching is enabled
        regex: true,
        smart: true,
      },
    });

    // Update the page length dynamically when itemsPerPage changes
    tableInstance.page.len(itemsPerPage).draw();

    // Cleanup function to destroy the DataTable instance when the component unmounts or itemsPerPage changes
    return () => {
      if (tableInstance) {
        tableInstance.destroy(true);
      }
    };
  }, [itemsPerPage]); // Reinitialize the DataTable when itemsPerPage changes

  return (
    <div>
      {/* Dropdown to change the number of items per page */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="itemsPerPage" style={{ marginRight: '10px' }}>
          Items Per Page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Table element that will be initialized by DataTable */}
      <table ref={tableRef} className="display" style={{ width: '100%' }}></table>
      <br />
    </div>
  );
};

export default ButtonGroups;
