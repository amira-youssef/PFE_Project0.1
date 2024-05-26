import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const RentForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get('startDate');
  const endDate = queryParams.get('endDate');
  const price = queryParams.get('price');
  const vehicleId = queryParams.get('id'); // Read vehicleId from the URL query parameters

  useEffect(() => {
    if (startDate && endDate) {
      setValue('pickupDateTime', new Date(startDate).toISOString().slice(0, 16));
      setValue('returnDateTime', new Date(endDate).toISOString().slice(0, 16));
    }
    if (price !== null) {
      setValue('price', parseFloat(price)); // or parseInt(price, 10) if you want an integer
    }
  }, [userData, startDate, endDate, price, setValue]);

  const onSubmit = async (data) => {
    const userId = userData._id; // Read userId from local storage
    console.log(`Submitting form for userId: ${userId}, vehicleId: ${vehicleId}`);
    console.log('Form Data:', data);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/rents/create/${userId}/${vehicleId}`,
        data
        ,{ withCredentials: true }

      );
  
      if (response.status === 201) {
        setOpenSnackbar(true);
        setSnackbarSeverity('success');
      } else {
        console.error('Error submitting form:', response.data);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
    }
  };
  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Driver Information</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Full Name"
            {...register('driverInformation.fullName', { required: 'Full name is required' })}
            fullWidth
            error={!!errors.driverInformation?.fullName}
            helperText={errors.driverInformation?.fullName?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Email"
            {...register('driverInformation.email', { required: 'Email is required' })}
            fullWidth
            error={!!errors.driverInformation?.email}
            helperText={errors.driverInformation?.email?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Phone Number"
            {...register('driverInformation.phoneNumber', { required: 'Phone number is required' })}
            fullWidth
            error={!!errors.driverInformation?.phoneNumber}
            helperText={errors.driverInformation?.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Address"
            {...register('driverInformation.address', { required: 'Address is required' })}
            fullWidth
            error={!!errors.driverInformation?.address}
            helperText={errors.driverInformation?.address?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's License Number"
            {...register('driverInformation.licenseNumber', { required: 'License number is required' })}
            fullWidth
            error={!!errors.driverInformation?.licenseNumber}
            helperText={errors.driverInformation?.licenseNumber?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Date of Birth"
            {...register('driverInformation.dateOfBirth', { required: 'Date of birth is required' })}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.driverInformation?.dateOfBirth}
            helperText={errors.driverInformation?.dateOfBirth?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Driver's Nationality"
            {...register('driverInformation.nationality', { required: 'Nationality is required' })}
            fullWidth
            error={!!errors.driverInformation?.nationality}
            helperText={errors.driverInformation?.nationality?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Relationship to Renter</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            SelectProps={{ native: true }}
            {...register('relationshipToRenter', { required: 'Relationship is required' })}
            fullWidth
            error={!!errors.relationshipToRenter}
            helperText={errors.relationshipToRenter?.message}
          >
            <option value="">Select Relationship</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <h2>Emergency Contact</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Emergency Contact Name"
            {...register('emergencyContact.name', { required: 'Emergency contact name is required' })}
            fullWidth
            error={!!errors.emergencyContact?.name}
            helperText={errors.emergencyContact?.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Emergency Contact Phone Number"
            {...register('emergencyContact.phoneNumber', { required: 'Emergency contact phone number is required' })}
            fullWidth
            error={!!errors.emergencyContact?.phoneNumber}
            helperText={errors.emergencyContact?.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Pickup and Return Information</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pickup Location"
            {...register('pickupLocation', { required: 'Pickup location is required' })}
            fullWidth
            error={!!errors.pickupLocation}
            helperText={errors.pickupLocation?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pickup Date and Time"
            {...register('pickupDateTime', { required: 'Pickup date and time is required' })}
            fullWidth
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            error={!!errors.pickupDateTime}
            helperText={errors.pickupDateTime?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Return Location"
            {...register('returnLocation', { required: 'Return location is required' })}
            fullWidth
            error={!!errors.returnLocation}
            helperText={errors.returnLocation?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Return Date and Time"
            {...register('returnDateTime', { required: 'Return date and time is required' })}
            fullWidth
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            error={!!errors.returnDateTime}
            helperText={errors.returnDateTime?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Price"
            {...register('price', { required: 'Price is required' })}
            fullWidth
            type="number"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            SelectProps={{ native: true }}
            {...register('paymentMethod', { required: 'Payment method is required' })}
            fullWidth
            error={!!errors.paymentMethod}
            helperText={errors.paymentMethod?.message}
          >
            <option value="">Select Payment Method</option>
            <option value="en ligne">En Ligne</option>
            <option value="sur place">Sur Place</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarSeverity === 'success' ? 'Form submitted successfully!' : 'Error submitting form.'}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default RentForm;
