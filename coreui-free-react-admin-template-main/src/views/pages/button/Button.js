import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CContainer, CRow, CCol, CButton, CForm, CFormInput, CFormLabel, CFormFeedback, CFormTextarea } from '@coreui/react';

const Button = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.dob) errors.dob = 'Date of birth is required';
    if (!formData.message) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, handle submission (e.g., send data to an API or redirect)
      console.log('Form Submitted', formData);

      // Redirect to the ButtonPage after submission
      navigate('/button');
    }
  };

  return (
  
<CContainer className="mt-5">
      {/* Submit form */}
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <h4>Submit the Form</h4>
              <CForm onSubmit={handleSubmit}>
                {/* First Name */}
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      invalid={formErrors.firstName ? true : false}
                    />
      <CFormFeedback invalid>{formErrors.firstName}</CFormFeedback>
                  </CCol>
                </CRow>

                {/* Last Name */}
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      invalid={formErrors.lastName ? true : false}
                    />
                    <CFormFeedback invalid>{formErrors.lastName}</CFormFeedback>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      invalid={formErrors.email ? true : false}
                    />
                    <CFormFeedback invalid>{formErrors.email}</CFormFeedback>
                  </CCol>
                </CRow>

                {/* Password */}
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="password">Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      invalid={formErrors.password ? true : false}
                    />
                    <CFormFeedback invalid>{formErrors.password}</CFormFeedback>
                  </CCol>
                </CRow>

                {/* Date of Birth */}
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
                    <CFormInput
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      invalid={formErrors.dob ? true : false}
                    />
                    <CFormFeedback invalid>{formErrors.dob}</CFormFeedback>
                  </CCol>
                </CRow>

                {/* Message */}
                <CRow>
                  <CCol xs={12} md={6}>
                    <CFormLabel htmlFor="message">Message</CFormLabel>
                    <CFormTextarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      invalid={formErrors.message ? true : false}
                    />
                    <CFormFeedback invalid>{formErrors.message}</CFormFeedback>
                  </CCol>
                </CRow>
                
                <br />
                <CButton type="submit" color="primary">
                  Submit The Form
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Button