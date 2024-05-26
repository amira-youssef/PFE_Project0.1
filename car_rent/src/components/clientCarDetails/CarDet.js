import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import CalendarComponent from "./Calendar"; // Assuming CalendarComponent is in the same folder

const CarDet = ({ onDateChange, onPriceChange }) => {
  const [carDetails, setCarDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleDateChange = (pickup, returnDate) => {
    if (onDateChange) {
      onDateChange(pickup, returnDate);
    }
  };

  return (
    <div className="car-details" style={{ marginTop: "20px" }}>
      {carDetails && (
        <>
          <table className="car-details-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Maker</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.maker}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Model</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.model}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Year</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.year}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Capacity</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.capacity}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Type</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.type}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", backgroundColor: "#f2f2f2", padding: "8px", borderBottom: "1px solid #ddd" }}>Price Per Day</th>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{carDetails.pricePerDay} DT</td>
              </tr>
            </tbody>
          </table>
          <CalendarComponent onDateChange={handleDateChange} onPriceChange={onPriceChange} />
        </>
      )}
    </div>
  );
};

export default CarDet;
