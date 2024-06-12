import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCity, faPhone, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../components/CarsList.css';  // Reuse the same CSS for styling
import './agencyModal.css';  // New CSS for modal styling
import HeroPages from '../components/HeroPages';

const AgenciesList = () => {
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchAgencies();
    return () => {
      setAgencies([]);
    };
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agencies/getAll');
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const fetchVehiclesByAgencyId = async (agencyId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicles/getByAgId/${agencyId}`);
      const vehiclesWithUpdatedImagePaths = response.data.map(vehicle => ({
        ...vehicle,
        mainImage: `http://localhost:5000/${vehicle.mainImage}`,
        image1: `http://localhost:5000/${vehicle.image1}`,
        image2: `http://localhost:5000/${vehicle.image2}`,
        image3: `http://localhost:5000/${vehicle.image3}`,
      }));
      setVehicles(vehiclesWithUpdatedImagePaths);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const openModal = (agency) => {
    setSelectedAgency(agency);
    fetchVehiclesByAgencyId(agency._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgency(null);
    setVehicles([]);
  };

  return (
    <div>
      <HeroPages name="Agencies" />
      <Grid container spacing={2}>
        {agencies.map((agency) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={agency._id}>
            <section className="models-section">
              <div className="models-div">
                <div className="models-div__box">
                  <div className="models-div__box__descr">
                    <div className="models-div__box__name">
                      <h3>{agency.name}</h3>
                    </div>
                    <div className="models-div__box__details">
                      <div className="agency-detail">
                        <FontAwesomeIcon icon={faCity} className="icon" />
                        <span>{agency.address}</span>
                      </div>
                      <div className="agency-detail">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                        <span>{agency.city}, {agency.state}</span>
                      </div>
                      <div className="agency-detail">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <span>{agency.phoneNumber}</span>
                      </div>
                      <div className="agency-detail">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>{agency.email}</span>
                      </div>
                    </div>
                    <div className="models-div__box__btn">
                      <button onClick={() => openModal(agency)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Grid>
        ))}
      </Grid>

      {selectedAgency && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Agency Details"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-header">
            <h2>{selectedAgency.name}</h2>
            <button onClick={closeModal} className="close-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-content">
            <p><strong>Address:</strong> {selectedAgency.address}</p>
            <p><strong>City:</strong> {selectedAgency.city}</p>
            <p><strong>State:</strong> {selectedAgency.state}</p>
            <p><strong>Zip Code:</strong> {selectedAgency.zipCode}</p>
            <p><strong>Phone Number:</strong> {selectedAgency.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedAgency.email}</p>
            <h3>Vehicles</h3>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle._id} className="vehicle-detail">
                  <img src={vehicle.mainImage} alt={`${vehicle.maker} ${vehicle.model}`} className="vehicle-image" />
                  <div className="vehicle-info">
                    <p><strong>{vehicle.maker} {vehicle.model}</strong></p>
                    <p><strong>Year:</strong> {vehicle.year}</p>
                    <p><strong>Type:</strong> {vehicle.type}</p>
                    <p><strong>Price Per Day:</strong> {vehicle.pricePerDay}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No vehicles available for this agency.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AgenciesList;
