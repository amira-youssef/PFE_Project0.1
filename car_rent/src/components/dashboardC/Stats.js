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
    rating: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} sx={{ color: 'gold' }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: 'gold' }} />);
      }
    }
    return stars;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Statistics</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Number of Cars: {stats.numberOfCars}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Number of Rents: {stats.numberOfRents}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Rating: {renderStars(stats.rating)}
      </Typography>
    </Box>
  );
}
