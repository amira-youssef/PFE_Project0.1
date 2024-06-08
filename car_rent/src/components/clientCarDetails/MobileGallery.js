import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import NextIcon from "../Icons/NextIcon";
import PreviousIcon from "../Icons/PreviousIcon";
import { useParams } from "react-router-dom";

const MobileGallery = () => {
  const [images, setImages] = useState([]);
  const [currentMobileImage, setCurrentMobileImage] = useState("");
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        const vehicle = response.data;
        const imagesWithUpdatedPaths = [
          vehicle.mainImage && `http://localhost:5000/${vehicle.mainImage}`,
          vehicle.image1 && `http://localhost:5000/${vehicle.image1}`,
          vehicle.image2 && `http://localhost:5000/${vehicle.image2}`,
          vehicle.image3 && `http://localhost:5000/${vehicle.image3}`,
        ].filter(Boolean); // Filter out undefined values
        setImages(imagesWithUpdatedPaths);
        setCurrentMobileImage(imagesWithUpdatedPaths[0]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [id]);

  const handleIncrement = () => {
    if (mobileImageIndex === images.length - 1) {
      setCurrentMobileImage(images[0]);
      setMobileImageIndex(0);
    } else {
      setCurrentMobileImage(images[mobileImageIndex + 1]);
      setMobileImageIndex(mobileImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (mobileImageIndex === 0) {
      setCurrentMobileImage(images[images.length - 1]);
      setMobileImageIndex(images.length - 1);
    } else {
      setCurrentMobileImage(images[mobileImageIndex - 1]);
      setMobileImageIndex(mobileImageIndex - 1);
    }
  };

  return (
    <section className="mobile-gallery hide-in-desktop">
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
      <img src={currentMobileImage} alt="featured-product" />
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
    </section>
  );
};

export default MobileGallery;
