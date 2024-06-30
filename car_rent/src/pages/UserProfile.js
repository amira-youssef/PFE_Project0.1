import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/dashboardC/CarsTab/style/components.css'; // Import the CSS file

const UserProfile = () => {
  const [rents, setRents] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRents = async () => {
      if (userData && userData._id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/rents/getAllByUser/${userData._id}`);
          setRents(response.data);
        } catch (error) {
          console.error('Error fetching rents:', error);
        }
      }
    };

    fetchRents();
  }, [userData]);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', false);
    navigate("/login");
    window.location.reload();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this rent?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/rents/deleteRent/${id}`);
        setRents(rents.filter(rent => rent._id !== id));
      } catch (error) {
        console.error('Error deleting rent:', error);
      }
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="container">
      <div className="justify-content-center">
        <div className="col-12 col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <div className="card__logo">
                <img 
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" 
                  alt="Profile Avatar"
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', marginBottom: '1rem' }} 
                />
              </div>
              <div className="card__data">
                <h3 className="card__title">User Information</h3>
                <p className="card__description"><strong>Name:</strong> {userData.nom} {userData.prenom}</p>
                <p className="card__description"><strong>Email:</strong> {userData.email}</p>
                <p className="card__description"><strong>Address:</strong> {userData.address}</p>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card__title">Rents</h3>
              <ul className="list-group list-group-flush">
                {rents.length > 0 ? (
                  rents.map((rent) => {
                    const { maker, model, mainImage, status, _id } = rent;
                    return (
                      <li className="list-group-item" key={_id}>
                        <div className="row align-items-center">
                          <div className="col-3 card__logo">
                            <img src={`http://localhost:5000/${mainImage}`} alt={`${maker} ${model}`} className="card__logo img" />
                          </div>
                          <div className="row">
                            <div className="card__data">
                              {status === 'pending' && (
                                <button className="btn btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
                              )}
                              <p className="card__description"><strong>Vehicle:</strong> {maker} {model}</p>
                              <p className="card__description"><strong>Pickup:</strong> {new Date(rent.pickupDateTime).toLocaleDateString()}</p>
                              <p className="card__description"><strong>Return:</strong> {new Date(rent.returnDateTime).toLocaleDateString()}</p>
                              <p className="card__description"><strong>Status:</strong> {status}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p>No rents found.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
