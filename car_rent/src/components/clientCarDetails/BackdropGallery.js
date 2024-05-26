import React, { useState, useEffect } from "react";
import { Backdrop, IconButton } from "@mui/material";
import axios from "axios";
import CloseIcon from "../Icons/CloseIcon";
import PreviousIcon from "../Icons/PreviousIcon";
import NextIcon from "../Icons/NextIcon";
import { useParams } from "react-router-dom";

const BackdropGallery = ({ open, handleClose, currentPassedImage }) => {
  const [images, setImages] = useState([]);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        // Assuming your API response contains an array of image URLs
        const { mainImage, image1, image2, image3 } = response.data;
        setImages([mainImage, image1, image2, image3]);
        setCurrentPassedImageIndex(images.indexOf(currentPassedImage));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [currentPassedImage]);

  const handleIncrement = () => {
    setCurrentPassedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDecrement = () => {
    setCurrentPassedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={handleClose}
    >
      <section className="backdrop-content" onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={handleDecrement}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={handleIncrement}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          <img
            src={images[currentPassedImageIndex]}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </div>
        <div className="thumbnails">
          {images.map((image, index) => (
            <div
              className="img-holder-backd"
              key={index}
              onClick={() => setCurrentPassedImageIndex(index)}
            >
              <div
                className={`outlay ${
                  index === currentPassedImageIndex && "activated"
                }`}
              ></div>
              <img src={image} alt={`product-${index + 1}`} style={ {width: "50%", height: "auto"  }} />
            </div>
          ))}
        </div>
      </section>
    </Backdrop>
  );
};

export default BackdropGallery;
