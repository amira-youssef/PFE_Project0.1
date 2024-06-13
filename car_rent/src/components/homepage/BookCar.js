import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookCar.css";

function BookCar() {
  const [agencyId, setAgencyId] = useState("");
  const [type, setType] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [vehicles, setVehicles] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vehicles/getAll"
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/agencies/getAll"
        );
        setAgencies(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchAgencies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicles/search",
        {
          params: {
            agencyId: agencyId,
            type: type,
            pickupDate: new Date(pickupDate).toISOString(),
            dropoffDate: new Date(dropoffDate).toISOString(),
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  return (
    <section id="booking-section" className="book-section">
      <div className="book-content">
        <div className="book-content__box">
          <form className="box-form" onSubmit={handleSubmit}>
            <div className="box-form__field select">
              <label>
                <i className="fa-solid fa-car"></i> &nbsp; Vehicle Type <b>*</b>
              </label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Select vehicle type</option>
                {vehicles.map((car) => (
                  <option key={car.id} value={car.type}>
                    {car.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="box-form__field select">
              <label>
                <i className="fa-solid fa-location-dot"></i> &nbsp; Address{" "}
                <b>*</b>
              </label>
              <select
                value={agencyId}
                onChange={(e) => setAgencyId(e.target.value)}
              >
                <option>Select your closest agency</option>
                {agencies.map((agency) => (
                  <option key={agency._id} value={agency._id}>
                    {agency.address}
                  </option>
                ))}
              </select>
            </div>

            <div className="box-form__car-time">
              <label htmlFor="pickupDate">
                <i className="fa-regular fa-calendar-days"></i> &nbsp; Pick-up{" "}
                <b>*</b>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            <div className="box-form__car-time">
              <label htmlFor="dropoffDate">
                <i className="fa-regular fa-calendar-days"></i> &nbsp; Drop-off{" "}
                <b>*</b>
              </label>
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                required
              />
            </div>

            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="book-content">
          <div className="book-content__box">
            <div className="box-form__car-time">
              <label>
                <i className="fa-regular"></i> &nbsp; Available Vehicles{" "}
                <b>*</b>
              </label>
              <ul class="list-group">
                {searchResults.map((vehicle) => (
                   <div className="list-group-item">
                   <Link
                     to={`/cars/${vehicle._id}`}
                     style={{
                       fontSize: '14px',
                       fontWeight: 'normal',
                       color: '#333',
                       textDecoration: 'none',
                     }}
                   >
                     {vehicle.maker} {vehicle.model}
                   </Link>
                 </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookCar;
