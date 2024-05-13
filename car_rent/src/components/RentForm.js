import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RentForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    dateOfBirth: '',
    nationality: '',
    drivingExperience: '',
    pickupLocation: '',
    pickupDateTime: '',
    returnLocation: '',
    returnDateTime: '',
    carId: '',
    paymentMethod: '',
    relationshipToRenter: '',
    emergencyContact: '',
    userId: '', // Assuming you have a way to get the logged-in user's ID
    price: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/rents', formData);
      history.push('/confirmation'); // Redirect to confirmation page after successful submission
    } catch (error) {
      console.error('Error creating rent:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RentForm;
