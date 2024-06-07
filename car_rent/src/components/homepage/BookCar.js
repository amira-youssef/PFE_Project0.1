import { useEffect, useState } from "react";
import axios from "axios";
import './BookCar.css';

function BookCar() {
  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

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
    setCarImg(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
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
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      errorMsg.style.display = "none";
      // handle booking logic here
    }
  };

  // dynamic car image URL based on selected car
  const selectedCar = cars.find(car => car.name === carImg);
  const imgUrl = selectedCar ? selectedCar.imageUrl : "";

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <section id="booking-section" className="book-section">
      <div >
        <div className="book-content">
          <div className="book-content__box">
            <h2>Book a car</h2>

            <p className="error-message">
              All fields required! <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
            </p>

            <p className="booking-done">
              Check your email to confirm an order.{" "}
              <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
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
                  <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up <b>*</b>
                </label>
                <select value={pickUp} onChange={handlePick}>
                  <option>Select pick up location</option>
                  <option>Belgrade</option>
                  <option>Novi Sad</option>
                  <option>Nis</option>
                  <option>Kragujevac</option>
                  <option>Subotica</option>
                </select>
              </div>

              <div className="box-form__car-type">
                <label>
                  <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off <b>*</b>
                </label>
                <select value={dropOff} onChange={handleDrop}>
                  <option>Select drop off location</option>
                  <option>Novi Sad</option>
                  <option>Belgrade</option>
                  <option>Nis</option>
                  <option>Kragujevac</option>
                  <option>Subotica</option>
                </select>
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

              <button type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookCar;
