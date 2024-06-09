import React, { useEffect, useState } from "react";
import "./Car.css";
import "../components/clientCarDetails/Calendar.css";
import { Container } from "@mui/material";
import Gallery from "../components/clientCarDetails/Gallery";
import MobileGallery from "../components/clientCarDetails/MobileGallery";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { Link, useParams } from "react-router-dom";
import { calculatePrice } from "../utils/calculatePrice";
import 'react-datepicker/dist/react-datepicker.css';

function CarDisplay() {
  const [disabledDates, setDisabledDates] = useState([]);
  const [carData, setCarData] = useState(null);
  const [datesSelected, setDatesSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
      const vehicle = response.data;
      const vehicleWithUpdatedImagePaths = {
        ...vehicle,
        mainImage: `http://localhost:5000/${vehicle.mainImage}`,
        image1: `http://localhost:5000/${vehicle.image1}`,
        image2: `http://localhost:5000/${vehicle.image2}`,
        image3: `http://localhost:5000/${vehicle.image3}`,
      };
      setCarData(vehicleWithUpdatedImagePaths);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    const fetchUnavailablePeriods = async () => {
      try {
        const rentsResponse = await axios.get(`http://localhost:5000/api/rents/getRentDates/${id}`);
        const maintenanceResponse = await axios.get(`http://localhost:5000/api/maint/getMaintDatesByVehicleId/${id}`);
    
        const carReservationDates = rentsResponse.data.map(item => ({
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate)
        }));
    
        const maintenanceDates = maintenanceResponse.data.map(item => ({
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate)
        }));
    
        const allDates = [...carReservationDates, ...maintenanceDates];
    
        const disabled = [];
        allDates.forEach(dateRange => {
          const startDate = dateRange.startDate;
          const endDate = dateRange.endDate;
          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            disabled.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
    
        console.log("Disabled dates:", disabled);
    
        setDisabledDates(disabled);
      } catch (error) {
        console.error('Error fetching unavailable periods:', error);
      }
    };

    fetchUnavailablePeriods();
  }, []);

  const filterDateFunction = (date, disabledDates) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return !disabledDates.some(disabledDate => {
      const disabledYear = disabledDate.getFullYear();
      const disabledMonth = disabledDate.getMonth();
      const disabledDay = disabledDate.getDate();
      return year === disabledYear && month === disabledMonth && day === disabledDay;
    });
  };

  useEffect(() => {
    if (startDate && endDate && carData) {
      const calculatedPrice = calculatePrice(startDate, endDate, carData.pricePerDay);
      setPrice(calculatedPrice);
      setDatesSelected(true);
    } else {
      setDatesSelected(false);
    }
  }, [startDate, endDate, carData]);

  const buttonStyle = {
    pointerEvents: datesSelected ? 'auto' : 'none',
    opacity: datesSelected ? 1 : 0.5,
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: datesSelected ? 'pointer' : 'default',
    display: 'inline-block',
  };

  if (!carData) {
    return <p>Loading car details...</p>;
  }

  return (
    <main className="App">
      <Container component="section" maxWidth={"xl"}>
        <section className="core">
          <Gallery images={[carData.mainImage, carData.image1, carData.image2, carData.image3]} />
          <MobileGallery images={[carData.mainImage, carData.image1, carData.image2, carData.image3]} />
          <section className="description">
            <p className="pre">Car Details</p>
            <h1>Car Description</h1>
            <p className="desc">{carData.description}</p>
            <div className="car-details" style={{ marginTop: "20px" }}>
              <table className="car-details-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Maker</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.maker}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Model</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.model}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Year</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.year}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Capacity</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.capacity}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Type</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.type}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Price Per Day</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carData.pricePerDay} DT</td>
                  </tr>
                </tbody>
              </table>
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
                      filterDate={date => filterDateFunction(date, disabledDates)}
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
                      filterDate={date => filterDateFunction(date, disabledDates)}
                      disabled={!startDate}
                    />
                  </div>
                </div>
                <div className="price-display">
                  <p>Total Price: {price} DT</p>
                </div>
                <div className="buttons">
                  <Link 
                    to={`/rent?id=${id}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&price=${price}`}
                    style={buttonStyle}
                  >
                    Rent Car
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Container>
      <footer className="attribution">
      </footer>
    </main>
  );
}

export default CarDisplay;
