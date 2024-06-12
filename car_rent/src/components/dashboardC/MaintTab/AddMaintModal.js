import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import './MaintenanceModal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddMaintModal({ show, onClose, vehicleId }) {
  const [form, setForm] = useState({
    vehicleId: vehicleId,
    managerId: '',
    startDate: '',
    endDate: '',
    type: '',
    price: ''
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData._id) {
      setForm((prevForm) => ({
        ...prevForm,
        managerId: userData._id
      }));
    }
  }, []);

  useEffect(() => {
    const fetchUnavailablePeriods = async () => {
      try {
        const rentsResponse = await axios.get(`http://localhost:5000/api/rents/getRentDates/${vehicleId}`);
        const maintenanceResponse = await axios.get(`http://localhost:5000/api/maint/getMaintDatesByVehicleId/${vehicleId}`);
    
        const carReservationDates = rentsResponse.data.map(item => ({
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate)
        }));
    
        const maintenanceDates = maintenanceResponse.data.map(item => ({
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate)
        }));
    
        const allDates = [...carReservationDates, ...maintenanceDates];
    
        const disabled = [];
        allDates.forEach(dateRange => {
          const startDate = dateRange.startDate;
          const endDate = dateRange.endDate;
          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            disabled.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
    
        setDisabledDates(disabled);
      } catch (error) {
        console.error('Error fetching unavailable periods:', error);
      }
    };

    fetchUnavailablePeriods();
  }, [vehicleId]);

  const filterDateFunction = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return !disabledDates.some(disabledDate => {
      const disabledYear = disabledDate.getFullYear();
      const disabledMonth = disabledDate.getMonth();
      const disabledDay = disabledDate.getDate();
      return year === disabledYear && month === disabledMonth && day === disabledDay;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setForm({
      ...form,
      startDate: date
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setForm({
      ...form,
      endDate: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/maint/create', form);
      onClose();
    } catch (error) {
      console.error('Error creating maintenance:', error);
    }
  };

  if (!show) return null;

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
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                placeholderText="Select start date"
                className="date-input"
                filterDate={date => filterDateFunction(date)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                placeholderText="Select end date"
                className="date-input"
                filterDate={date => filterDateFunction(date)}
                disabled={!startDate}
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
