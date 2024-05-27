import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const dates = ({ vehicleId }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const rentalResponse = await axios.get(`/api/rents/${vehicleId}`);
        const maintenanceResponse = await axios.get(`/api/maintenance?vehicleId=${vehicleId}`);

        const rentalDates = rentalResponse.data.map(rental => {
          const dates = [];
          const currentDate = new Date(rental.startDate);
          const endDate = new Date(rental.endDate);
          while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        }).flat();

        const maintenanceDates = maintenanceResponse.data.map(maintenance => {
          const dates = [];
          const currentDate = new Date(maintenance.startDate);
          const endDate = new Date(maintenance.endDate);
          while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        }).flat();

        setUnavailableDates([...rentalDates, ...maintenanceDates]);
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, [vehicleId]);

  return (
    <Card 
      _id={vehicleId}
      maker="MakerName" // Replace with actual data
      model="ModelName" // Replace with actual data
      boite="BoiteType" // Replace with actual data
      year="Year" // Replace with actual data
      capacity="Capacity" // Replace with actual data
      type="Type" // Replace with actual data
      description="Description" // Replace with actual data
      mainImage="MainImageURL" // Replace with actual data
      image1="ImageURL1" // Replace with actual data
      image2="ImageURL2" // Replace with actual data
      image3="ImageURL3" // Replace with actual data
      pricePerDay="PricePerDay" // Replace with actual data
      count="Count" // Replace with actual data
      addTagHandler={(tagType, tagValue) => {}} // Implement or replace as needed
      unavailableDates={unavailableDates}
    />
  );
};

export default dates;
