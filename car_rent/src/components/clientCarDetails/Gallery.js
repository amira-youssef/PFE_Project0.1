import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";
import axios from "axios";
import { useParams } from "react-router-dom";

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState("");
  const [currentPassedImage, setCurrentPassedImage] = useState("");
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [thumbs, setThumbs] = useState([]);

  const handleClick = (index) => {
    setCurrentImage(images[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/getById/${id}`);
        // Assuming your API response contains an array of image URLs
        const { mainImage, image1, image2, image3 } = response.data;
        setImages([mainImage, image1, image2, image3]);
        setThumbs([mainImage, image1, image2, image3]);
        setCurrentImage(mainImage);
        setCurrentPassedImage(mainImage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" onClick={handleToggle} />
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        />
        <div className="thumbnails">
          {thumbs.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>
                <img src={th} alt={`product-${index + 1}`}  style={{ "object-fit": "contain" }} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
