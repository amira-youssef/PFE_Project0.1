import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddAgencyModal from './AddAgencyModal';

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
      <table className="agency-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency._id}>
              <td>{agency.name}</td>
              <td>{agency.address}</td>
              <td>{agency.city}</td>
              <td>{agency.state}</td>
              <td>
                <button onClick={() => handleDeleteAgency(agency._id)} className="delete-button">
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAgencyModal show={isAddAgencyModalOpen} onClose={handleCloseAddAgencyModal} />
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .add-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          margin: 10px 0;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .agency-table {
          width: 100%;
          border-collapse: collapse;
        }
        .agency-table th, .agency-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .delete-button {
          background-color: #dc3545;
          color: #fff;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default FilterableAgencies;
