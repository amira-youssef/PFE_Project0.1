import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import axios from 'axios';
//import { calculatePrice } from '../../utils/calculatePrice';
import { useParams } from 'react-router-dom';

const CalendarComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ratePerDay, setRatePerDay] = useState(null);
  const [price, setPrice] = useState();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchCarPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        if (isMounted) {
          setRatePerDay(response.data.pricePerDay);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarPrice();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (startDate && endDate) {
      const calculatedPrice = calculatePrice(startDate, endDate, ratePerDay);
      setPrice(calculatedPrice);
      if (onDateChange) {
        onDateChange(startDate, endDate, calculatedPrice); // Notify parent component about date and price change
      }
    } else if (onDateChange) {
      onDateChange(null, null, 0); // Notify parent component that dates are not selected
    }
  }, [startDate, endDate, ratePerDay, onDateChange]);

  return (
    <div className="calendar-container">
      <h2>Select Rental Dates</h2>
      <div className="date-pickers">
        <div className="date-picker">
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            minDate={new Date()}
            placeholderText="Select start date"
            className="date-input"
          />
        </div>
        <div className="date-picker">
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            minDate={startDate}
            placeholderText="Select end date"
            className="date-input"
          />
        </div>
      </div>
      <div className="price-display">
        <p>Total Price: {price} DT</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
