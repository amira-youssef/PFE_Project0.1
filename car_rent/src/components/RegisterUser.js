import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form'; // Optional for validation
import axios from 'axios';

function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Access errors from react-hook-form
    watch,
    reset, 
  } = useForm(); // Using react-hook-form for validation (optional)

  const [openSnackbar, setOpenSnackbar] = React.useState(false); // State for snackbar visibility
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // State for snackbar severity

  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    
    if (password !== confirmPassword) {
      // Passwords do not match, show error message
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/registerU', 
        data,
        { withCredentials: true }
      );
  
      if (response.status === 201) { // Check if status is 201 for successful registration
        setOpenSnackbar(true);
        setSnackbarSeverity('success');
        // Clear form after successful submission
        reset();
      } else {
        // Handle errors provided by the server
        console.error('Error submitting form:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Detailed AxiosError:', error.response.data); // Log detailed error response
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
        <Button type="submit" variant="contained">
          Register
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

export default RegisterUser;
