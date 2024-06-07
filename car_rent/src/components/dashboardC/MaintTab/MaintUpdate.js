import React, { useState } from 'react';
import axios from 'axios';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './MaintenanceModal.css';

const MaintUpdate = ({ show, maintenance, onClose, onMaintenanceUpdate }) => {
  const [formData, setFormData] = useState({
    type: maintenance.type,
    startDate: maintenance.startDate.split('T')[0], // Formatting date for input type="date"
    endDate: maintenance.endDate.split('T')[0], // Formatting date for input type="date"
    price: maintenance.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/maint/update/${maintenance._id}`, formData);
      onMaintenanceUpdate(response.data); // Update the state in the parent component
      onClose();
    } catch (error) {
      console.error('Error updating maintenance:', error);
    }
  };

  return (
    <Modal open={show} onClose={onClose} className="modal-overlay">
      <div className="modal">
        <h2>Edit Maintenance</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="assurance">Assurance</MenuItem>
              <MenuItem value="panne">Panne</MenuItem>
              <MenuItem value="vignette">Vignette</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="lavage">Lavage</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default MaintUpdate;
