import React, { useState } from 'react';
import './style/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AddCarModal({ show, onClose }) {
  const [form, setForm] = useState({
    maker: '',
    model: '',
    boite: '',
    year: '',
    capacity: '',
    type: '',
    description: '',
    pricePerDay: '',
    mainImage: '',
    image1: '',
    image2: '',
    image3: '',
    address: '',
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/vehicles/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setForm({
          ...form,
          [fieldName]: response.data.path,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const agencyId = userData?.agencyId;
      if (!agencyId) {
        throw new Error('No agency ID found for the user.');
      }

      const data = { ...form, agencyId };
      await axios.post('http://localhost:5000/api/vehicles/create', data);
      onClose();
    } catch (error) {
      console.error('Error creating vehicle:', error);
      // Handle error
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Car</h2>
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {field.toLowerCase().includes('image') ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    name={field}
                    onChange={handleFileUpload}
                    required
                  />
                  {form[field] && <img src={`http://localhost:5000/${form[field]}`} alt={field} className="preview-image" />}
                </>
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit" className="submit-button">Add Car</button>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;
