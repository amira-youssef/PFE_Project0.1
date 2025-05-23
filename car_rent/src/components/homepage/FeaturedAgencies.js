import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const FeaturedAgencies = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetchAgencies();
    return () => {
      setAgencies([]);
  };
  }, []);
   const fetchAgencies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agencies/getAll');
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };
  return (
    <div>
      <Grid container spacing={3}>
        {agencies.map(agency => (
          <Grid item xs={12} sm={6} md={4} key={agency._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {agency.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {agency.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Contact: {agency.phoneNumber} / {agency.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturedAgencies;
