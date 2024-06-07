import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddAgencyModal from './AddAgencyModal';
import '../dashboardC/CarsTab/style/components.css';

function FilterableAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [isAddAgencyModalOpen, setIsAddAgencyModalOpen] = useState(false);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/agencies/getAll');
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const handleOpenAddAgencyModal = () => {
    setIsAddAgencyModalOpen(true);
  };

  const handleCloseAddAgencyModal = () => {
    setIsAddAgencyModalOpen(false);
    fetchAgencies();
  };

  const handleDeleteAgency = async (agencyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/agencies/${agencyId}`);
      fetchAgencies();
    } catch (error) {
      console.error('Error deleting agency:', error);
    }
  };

  return (
    <div className="container">
      <button className="add-button" onClick={handleOpenAddAgencyModal}>
        <FontAwesomeIcon icon={faPlus} /> Add Agency
      </button>
      <div className="cards-list">
        {agencies.map((agency) => (
          <div key={agency._id} className="card">
            <h3>{agency.name}</h3>
            <p>Address: {agency.address}</p>
            <p>City: {agency.city}</p>
            <p>State: {agency.state}</p>
            <button onClick={() => handleDeleteAgency(agency._id)} className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        ))}
      </div>
      <AddAgencyModal show={isAddAgencyModalOpen} onClose={handleCloseAddAgencyModal} />
    </div>
  );
}

export default FilterableAgencies;
