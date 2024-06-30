import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AgencyForm.css';

const AgencyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode) {
      newErrors.zipCode = 'Zip Code is required';
    } else if (!/^\d{4}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip Code must be 5 digits';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();

    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        `http://localhost:5000/api/agencies/create/${userData._id}`,
        formData
      );

      // Update the localStorage with the new agencyId
      userData.agencyId = response.data.agency._id;
      localStorage.setItem('userData', JSON.stringify(userData));

      setSuccess('Agency created successfully!');
      setErrors({});
      setTimeout(() => {
        navigate('/manager');
      }, 2000);
    } catch (error) {
      setErrors({ submit: 'Failed to create agency. Please try again.' });
      setSuccess('');
    }
  };

  return (
    <div className="agency-form-container">
      <h2>Create Agency</h2>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="agency-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <button type="submit" className="submit-button">
          Create Agency
        </button>
      </form>
    </div>
  );
};

export default AgencyForm;
