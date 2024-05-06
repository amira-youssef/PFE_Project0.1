import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function RegisterMan() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    
    if (password !== confirmPassword) {
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/registerM', 
        data,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setOpenSnackbar(true);
        setSnackbarSeverity('success');
        reset();
      } else {
        console.error('Error submitting form:', response.data);
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
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Nom"
          {...register('nom', { required: 'Nom is required' })}
          error={!!errors.nom}
          helperText={errors.nom ? errors.nom.message : ''}
        />
        <TextField
          label="Prénom"
          {...register('prenom', { required: 'Prénom is required' })}
          error={!!errors.prenom}
          helperText={errors.prenom ? errors.prenom.message : ''}
        />
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Password"
          {...register('password', { required: 'Password is required', minLength: 6 })}
          type="password"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <TextField
          label="Confirm Password"
          {...register('confirmPassword', {
            validate: (value) => value === password.current || "The passwords do not match"
          })}
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />
        <TextField
          label="Birthdate"
          {...register('birthdate', { required: 'Birthdate is required' })}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Agence"
          {...register('agence')}
          error={!!errors.agence}
          helperText={errors.agence ? errors.agence.message : ''}
        />
        <TextField
          label="Numéro de Téléphone"
          {...register('numTel')}
          error={!!errors.numTel}
          helperText={errors.numTel ? errors.numTel.message : ''}
        />
        <TextField
          label="Buisness Email"
          {...register('buisnessEmail', { required: 'Buisness Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })}
          error={!!errors.buisnessEmail}
          helperText={errors.buisnessEmail ? errors.buisnessEmail.message : ''}
        />
        <Button type="submit" variant="contained">
          Register Manager
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarSeverity === 'success' ? 'Registration successful!' : 'Registration failed'}
          </Alert>
        </Snackbar>
      </div>
    </form>
  );
}

export default RegisterMan;
