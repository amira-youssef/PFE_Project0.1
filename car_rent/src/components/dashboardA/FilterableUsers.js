import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddUserModal from './AddUserModal';
import '../dashboardC/CarsTab/style/components.css';

function FilterableUsers() {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/allUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <button className="add-button" onClick={handleOpenAddUserModal}>
        <FontAwesomeIcon icon={faUserPlus} /> Add User
      </button>
      <div className="cards-list">
        {users.map((user) => (
          <div key={user._id} className="card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => handleDeleteUser(user._id)} className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        ))}
      </div>
      <AddUserModal show={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
    </div>
  );
}

export default FilterableUsers;
