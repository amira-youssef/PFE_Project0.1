import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RegisterUser from '../components/RegisterUser';
import RegisterMan from '../components/RegisterMan';
import '../style/Registration.css';
import { Link } from 'react-router-dom';

export default function Registration() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', mt: 4, p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'linear-gradient(135deg, #ff2000, #f2d8f4)' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab value="one" label="Register as User" />
        <Tab value="two" label="Register as Manager" />
      </Tabs>

      {value === 'one' && (
        <Box p={3}>
          <RegisterUser />
        </Box>
      )}
      {value === 'two' && (
        <Box p={3}>
          <RegisterMan />
        </Box>
      )}

        <div className="sign-in-link">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>  
    </Box>
  );
}
