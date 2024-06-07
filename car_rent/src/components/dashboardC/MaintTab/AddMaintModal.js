// MaintenanceModal.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import './MaintenanceModal.css';

function AddMaintModal({ show, onClose, vehicleId }) {
  const [form, setForm] = useState({
    vehicleId: vehicleId,
    managerId: '',
    startDate: '',
    endDate: '',
    type: '',
    price: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData._id) {
      setForm((prevForm) => ({
        ...prevForm,
        managerId: userData._id
      }));
    }
  }, []);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/maint/create', form);
      onClose();
    } catch (error) {
      console.error('Error creating maintenance:', error);
      // Handle error
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Maintenance</h2>
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Type"
                name="type"
                select
                value={form.type}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="assurance">Assurance</MenuItem>
                <MenuItem value="panne">Panne</MenuItem>
                <MenuItem value="vignette">Vignette</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="lavage">Lavage</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Add Maintenance
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddMaintModal;
