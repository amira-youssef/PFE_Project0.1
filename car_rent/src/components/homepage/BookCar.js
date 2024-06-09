import { useEffect, useState } from "react";
import axios from "axios";
import './BookCar.css';

function BookCar() {
  // booking car
  const [carType, setCarType] = useState("");
  const [address, setAddress] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");

  const [cars, setCars] = useState([]); // state to store fetched car data

  useEffect(() => {
    // Fetch car data from API
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles/getAll');
        setCars(response.data); // assume response.data is an array of car objects
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (address === "" || pickTime === "" || dropTime === "" || carType === "") {
      errorMsg.style.display = "flex";
    } else {
      errorMsg.style.display = "none";
      // handle booking logic here
    }
  };

  return (
    <section id="booking-section" className="book-section">
      <div className="book-content">
        <div className="book-content__box">
        

          <p className="error-message">
            All fields required! <i onClick={() => document.querySelector(".error-message").style.display = "none"} className="fa-solid fa-xmark"></i>
          </p>

          <form className="box-form" onSubmit={handleSubmit}>
            <div className="box-form__car-type">
              <label>
                <i className="fa-solid fa-car"></i> &nbsp; Select Your Car Type <b>*</b>
              </label>
              <select value={carType} onChange={handleCar}>
                <option>Select your car type</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="box-form__car-type">
              <label>
                <i className="fa-solid fa-location-dot"></i> &nbsp; Address <b>*</b>
              </label>
              <input
                type="text"
                value={address}
                onChange={handleAddress}
                placeholder="Enter address"
              />
            </div>

            <div className="box-form__car-time">
              <label htmlFor="picktime">
                <i className="fa-regular fa-calendar-days"></i> &nbsp; Pick-up <b>*</b>
              </label>
              <input
                id="picktime"
                value={pickTime}
                onChange={handlePickTime}
                type="date"
              />
            </div>

            <div className="box-form__car-time">
              <label htmlFor="droptime">
                <i className="fa-regular fa-calendar-days"></i> &nbsp; Drop-off <b>*</b>
              </label>
              <input
                id="droptime"
                value={dropTime}
                onChange={handleDropTime}
                type="date"
              />
            </div>

            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookCar;
