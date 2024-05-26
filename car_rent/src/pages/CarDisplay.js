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
  const [allData, setAllData] = useState(null);
  const [datesSelected, setDatesSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        setAllData(response.data);
        console.log(id);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && allData) {
      const calculatedPrice = calculatePrice(startDate, endDate, allData.pricePerDay);
      setPrice(calculatedPrice);
      setDatesSelected(true);
    } else {
      setDatesSelected(false);
    }
  }, [startDate, endDate, allData]);

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

  if (!allData) {
    return <p>Loading car details...</p>;
  }

  return (
    <main className="App">
      <Container component="section" maxWidth={"xl"}>
        <section className="core">
          <Gallery />
          <MobileGallery />
          <section className="description">
            <p className="pre">Car Details</p>
            <h1>Car Description</h1>
            <p className="desc">{allData.description}</p>
            <div className="car-details" style={{ marginTop: "20px" }}>
              <table className="car-details-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Maker</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.maker}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Model</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.model}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Year</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.year}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Capacity</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.capacity}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Type</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.type}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Price Per Day</th>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{allData.pricePerDay} DT</td>
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
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/Abdelghafour122"
          target="_blank"
          rel="noreferrer"
        >
          Abdelghafour122
        </a>
        .
      </footer>
    </main>
  );
}

export default CarDisplay;
