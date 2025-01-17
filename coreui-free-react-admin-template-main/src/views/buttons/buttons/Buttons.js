

import React, { useState, useEffect ,useRef} from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CFormInput,
  CButton
} from '@coreui/react';

import * as XLSX from 'xlsx'; // Import xlsx library
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // For table in PDF

const Buttons = () => {
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchFormData = async (page = 1, query = '') => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(
        `http://127.0.0.1:3007/api/auth/studentFormData?page=${page}&limit=${itemsPerPage}&search=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setFormData(result.data || []);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  
  useEffect(() => {
    fetchFormData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSubmitForm = () => {
    navigate('/buttons/buttons/form');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://127.0.0.1:3007/api/auth/studentFormData/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setFormData(formData.filter((data) => data.id !== id));
          alert('Record deleted successfully.');
        } else {
          console.error('Error deleting record');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  const handleEdit = (id) => {
    setEditingRow(id);
    const rowToEdit = formData.find((data) => data.id === id);
    setEditedData(rowToEdit || {});
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://127.0.0.1:3007/api/auth/studentFormData/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setFormData(formData.map((data) => (data.id === id ? editedData : data)));
        setEditingRow(null);
        alert('Record updated successfully.');
      } else {
        console.error('Error updating record');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const filteredData = formData.filter((data) =>
    ['email', 'address', 'city', 'country'].some((field) =>
      data[field]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentData = filteredData.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);


  // Export to Excel functionality 
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formData); // Convert data to sheet
    const workbook = XLSX.utils.book_new(); // new Excel Workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Table'); // Append sheet to workbook

    // Save file
    XLSX.writeFile(workbook, 'DataTable.xlsx');
  };

  // Export to PDF functionality
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Form Data', 14, 10); // Add a title
    const tableColumn = ['ID', 'Email', 'Address', 'City', 'Country'];
    const tableRows = formData.map((data) => [
      data.id,
      data.email,
      data.address,
      data.city,
      data.country,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('DataTable.pdf');
  };

  return (
    <CContainer className="mt-5">
      <CRow>
      <CRow>
      <div>
           <button onClick={handleSubmitForm} className="btn btn-danger">
             Click Form
           </button>
           <CButton color="success" className="ms-3" onClick={exportToExcel}>
             Export to Excel
           </CButton>
           <CButton color="primary" className="ms-3" onClick={exportToPDF}>
              Export to PDF
            </CButton>
         </div>
       </CRow>
       
      </CRow>
      <br />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Student Form Data</h4>
              <br />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <CFormInput
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {filteredData.length === 0 ? (
                <p>No results found.</p>
              ) : (
                <CTable bordered hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>ID</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Address</CTableHeaderCell>
                      <CTableHeaderCell>City</CTableHeaderCell>
                      <CTableHeaderCell>Country</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentData.map((data) => (
                      <CTableRow key={data.id}>
                        <CTableDataCell>{data.id}</CTableDataCell>
                        {editingRow === data.id ? (
                          <>
                            <CTableDataCell>
                              <input
                                type="text"
                                value={editedData.email || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <input
                                type="text"
                                value={editedData.address || ''}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <input
                                type="text"
                                value={editedData.city || ''}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <input
                                type="text"
                                value={editedData.country || ''}
                                onChange={(e) => handleInputChange('country', e.target.value)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <button className="btn btn-success btn-sm" onClick={() => handleSave(data.id)}>
                                Save
                              </button>
                            </CTableDataCell>
                          </>
                        ) : (
                          <>
                            <CTableDataCell>{data.email}</CTableDataCell>
                            <CTableDataCell>{data.address}</CTableDataCell>
                            <CTableDataCell>{data.city}</CTableDataCell>
                            <CTableDataCell>{data.country}</CTableDataCell>
                            <CTableDataCell>
                              <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(data.id)}>
                                Edit
                              </button>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(data.id)}>
                                Delete
                              </button>
                            </CTableDataCell>
                          </>
                        )}
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
              <CPagination align="center">
                <CPaginationItem  onClick={() => handlePageChange(currentPage - 1)}>
                  {'<'}
                </CPaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <CPaginationItem
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  // disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {'>'}
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br />



    </CContainer>

  );
};

export default Buttons; 