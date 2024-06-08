import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CarsList.css';
import HeroPages from './HeroPages';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
    return () => {
      setCars([]);
    };
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles/getAll');
      const setUpdatedImagePaths= response.data.map(vehicle => ({
        ...vehicle,
        mainImage: `http://localhost:5000/${vehicle.mainImage}`,
        image1: `http://localhost:5000/${vehicle.image1}`,
        image2: `http://localhost:5000/${vehicle.image2}`,
        image3: `http://localhost:5000/${vehicle.image3}`,
        
      }));
      setCars(setUpdatedImagePaths);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (

    
    <div>
      <div>
      <HeroPages name="Vehicle Models" />    
      </div>
    

    <Grid container spacing={2} >
      {cars.map((car) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={car._id}>
          <section className="models-section">
            <div className="models-div">
              <div className="models-div__box">
                <div className="models-div__box__img">
                  <img src={car.mainImage} alt="car_img" />
                </div>
                <div className="models-div__box__descr">
                  <div className="models-div__box__descr__name-price">
                    <div className="models-div__box__descr__name-price__name">
                      <p>{car.maker} {car.model}</p>
                      <span>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__price">
                      <h4>{car.pricePerDay} Dt</h4>
                      <p>per day</p>
                    </div>
                  </div>
                  <div className="models-div__box__descr__name-price__details">
                    <span>
                      <i className="fa-solid fa-car-side"></i> &nbsp;{car.maker}
                    </span>
                    <span style={{ textAlign: 'right' }}>
                    {car.type}&nbsp; <i className="fa-solid fa-car-side"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-car-side"></i> &nbsp; {car.boite}
                    </span>
                    <span style={{ textAlign: 'right' }}>
                      {car.year} &nbsp; <i className="fa-solid fa-car-side"></i>
                    </span>
                  </div>
                  <div className="models-div__box__descr__btn">
                    <Link onClick={() => window.scrollTo(0, 0)} to={`/cars/${car._id}`}>
                      Book Ride
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default CarsList;
