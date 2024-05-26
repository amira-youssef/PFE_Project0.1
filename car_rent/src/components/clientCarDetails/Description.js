import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//import CarDet from "./CarDet";

const Description = () => {
  const [description, setDescription] = useState("");
  const [datesSelected, setDatesSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };
    fetchDescription();
  }, [id]);

  const handleDateChange = (pickup, returnDate) => {
    setDatesSelected(!!pickup && !!returnDate);
    setStartDate(pickup);
    setEndDate(returnDate);
  };

  const handlePriceChange = (calculatedPrice) => {
    setPrice(calculatedPrice);
    
  };

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

  return (
    <section className="description">
      <p className="pre">Car Details</p>
      <h1>Car Description</h1>
      <p className="desc">{description}</p>
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
        </>
      )}
    </div>
    <div className="buttons">
      <Link 
       to={`/rent/${id}?startDate=${startDate}&endDate=${endDate}&price=${price}`}
      style={buttonStyle}
    >
  Rent Car
</Link>

      </div>
    </section>
  );
};

export default Description;
