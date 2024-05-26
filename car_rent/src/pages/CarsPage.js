import { Typography } from '@material-ui/core';
import React from 'react';
import CarsList from '../components/CarsList';
// ekhdem aala rohik ye bentii <3
const CarsPage= () => {
  return (        
  <>    
      <Typography variant="h4" gutterBottom>
          Our Cars
      </Typography>
      <CarsList />
      </>
  );
};

export default CarsPage;

