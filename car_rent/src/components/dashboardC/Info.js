import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import Title from './Title';

export default function Info() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [managerData, setManagerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = userData?._id;
      if (!id) {
        console.error('No Manager Id found in local storage.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/getUserById/${id}`);
        setManagerData(response.data);
      } catch (error) {
        console.error("Error fetching manager details:", error);
      }
    };

    fetchData();
  }, [userData?._id]);

  if (!managerData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Title>{managerData?.agence} Agency</Title>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome, {managerData?.prenom}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Business Email: {managerData?.buisnessEmail}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Email: {managerData?.email}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Phone Number: {managerData?.numTel}
      </Typography>
    </Box>
  );
}
