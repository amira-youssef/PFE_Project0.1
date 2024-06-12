import { Link } from "react-router-dom";
import BgShape from '../../assets/hero/hero-bg.png';
import HeroCar from '../../assets/hero/main-car.png';
import { useEffect, useState } from "react";
import './Hero.css' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookBtn = () => {
    document.querySelector("#booking-section").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  
  return (
    <section id="home" className="hero-section">
      <div>
        <img className="bg-shape" src={BgShape} alt="bg-shape" />
        <div className="hero-content">
          <div className="hero-content__text">
            <h4>Plan your trip now</h4>
            <h1>
              Save <span>big</span> with our car rental
            </h1>
            <p>
              Rent the car of your dreams. Unbeatable prices, unlimited miles,
              flexible pick-up options and much more.
            </p>
            <div className="hero-content__text__btns">
              <Link
                className="hero-content__text__btns__book-ride"
                to="/cars"
              >
                Book Ride &nbsp; <i className="fa-solid fa-circle-check"></i>
              </Link>
              <Link className="hero-content__text__btns__learn-more" to="/howTo">
                Learn More &nbsp; <i className="fa-solid fa-angle-right"></i>
              </Link>
            </div>
          </div>

          <img
            src={HeroCar}
            alt="car-img"
            className="hero-content__car-img"
          />
        </div>
      </div>

      <div
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </section>
  );
}

export default Hero;
