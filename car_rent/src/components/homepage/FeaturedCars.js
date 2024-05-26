import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
    return ()=>{
      setCars([]);
    };
  }, []);

    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles/getAll');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

  return (
    <Grid container spacing={2}>
      {cars.map((car) => (
        <Grid item xs={12} sm={6} md={4} key={car._id}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={car.mainImage}
                alt={car.model}
              />
              <CardContent>
                <h2>{car.maker} {car.model}</h2>
                <p>Year: {car.year}</p>
                <p>Description: {car.description}</p>
                <p>boite: {car.boite}</p>
                <p>Price per Day: {car.pricePerDay}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedCars;
