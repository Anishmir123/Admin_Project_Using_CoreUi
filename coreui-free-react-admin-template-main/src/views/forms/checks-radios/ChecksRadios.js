// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const ChecksRadios = () => {
//   const [data, setData] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   // Handle file upload and parse Excel data
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const arrayBuffer = e.target.result;
//       const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
//       const worksheetName = workbook.SheetNames[0]; // Get the first sheet
//       const worksheet = workbook.Sheets[worksheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       setData(jsonData); // Set parsed data to state
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Function to send data to the backend
//   const uploadDataToDatabase = async () => {
//     setIsUploading(true);
//     try {
//       const response = await fetch('http://localhost:3007/api/auth/uploadExcelData', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ data }),
//       });

//       if (response.ok) {
//         alert('Data uploaded successfully!');
//         setData([]); // Clear the table after successful upload
//       } else {
//         const error = await response.json();
//         alert(`Error uploading data: ${error.message}`);
//       }
//     } catch (error) {
//       console.error('Error uploading data:', error);
//       alert('Error uploading data. Please try again.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h3>Upload The Excel Data</h3>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//       <div style={{ marginTop: '20px' }}>
//         {data.length === 0 ? (
//           <p>No data uploaded. Please select an Excel file.</p>
//         ) : (
//           <>
//             <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
//               <thead>
//                 <tr>
//                   {Object.keys(data[0]).map((key) => (
//                     <th key={key}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row, index) => (
//                   <tr key={index}>
//                     {Object.values(row).map((value, i) => (
//                       <td key={i}>{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               onClick={uploadDataToDatabase}
//               disabled={isUploading}
//               style={{
//                 marginTop: '20px',
//                 padding: '10px 20px',
//                 backgroundColor: isUploading ? 'grey' : 'blue',
//                 color: 'white',
//                 border: 'none',
//                 cursor: isUploading ? 'not-allowed' : 'pointer',
//               }}
//             >
//               {isUploading ? 'Uploading...' : 'Save to Database'}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChecksRadios;

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ChecksRadios = () => {
  const [fileName, setFileName] = useState(''); // To store the uploaded file name
  const [data, setData] = useState([]); // Parsed Excel data
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name); // Set the file name
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData); // Log the parsed Excel data for debugging
      setData(jsonData); // Store parsed data for uploading
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadDataToDatabase = async () => {
    setIsUploading(true);
    try {
      console.log('Uploading data:', data); // Log the data before sending to backend
      const response = await fetch('http://localhost:3007/api/auth/uploadExcelData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        alert('Data uploaded successfully!');
        setFileName(''); // Clear the file name after successful upload
        setData([]); // Clear the parsed data
      } else {
        const error = await response.json();
        alert(`Error uploading data: ${error.message}`);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Upload Excel Data</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploaded File: <strong>{fileName}</strong></p>
          <button
            onClick={uploadDataToDatabase}
            disabled={isUploading}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: isUploading ? 'grey' : 'blue',
              color: 'white',
              border: 'none',
              cursor: isUploading ? 'not-allowed' : 'pointer',
            }}
          >
            {isUploading ? 'Uploading...' : 'Save to Database'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecksRadios;
