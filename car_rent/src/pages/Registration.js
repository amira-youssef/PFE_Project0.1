import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RegisterUser from '../components/RegisterUser';
import RegisterMan from '../components/RegisterMan';

export default function Registration() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Register as User" />
        <Tab value="two" label="Register as Manager" />
      </Tabs>
      {/* Render RegisterUser only when value is 'one' */}
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
    </Box>
  );
}
