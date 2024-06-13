import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Stats() {
  const [stats, setStats] = useState({
    numberOfCars: 0,
    numberOfRents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const agencyId = userData?.agencyId;
        
        if (!agencyId) {
          console.error('No agency ID found for the user.');
          return;
        }

        const [rentsResponse, carsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/rents/countByAgency/${agencyId}`),
          axios.get(`http://localhost:5000/api/vehicles/countByAgency/${agencyId}`)
        ]);

        setStats({
          numberOfCars: carsResponse.data.count,
          numberOfRents: rentsResponse.data.count,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Statistics</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Number of Cars: {stats.numberOfCars}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Number of Rents: {stats.numberOfRents}
      </Typography>
    </Box>
  );
}
