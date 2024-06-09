import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserPlus, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import AddUserModal from './AddUserModal';

function FilterableUsers() {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/allUsers');
      const allUsers = response.data;
      setUsers(allUsers.filter(user => user.role === 'user'));
      setManagers(allUsers.filter(user => user.role === 'manager'));
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

  const handleToggleActiveManager = async (userId, isActive) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/toggleActive/${userId}`, { isActive });
      fetchUsers();
    } catch (error) {
      console.error(`Error ${isActive ? 'activating' : 'rejecting'} manager:`, error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleOpenAddUserModal}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <FontAwesomeIcon icon={faUserPlus} /> Add User
      </button>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Users</th>
              </tr>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.nom} {user.prenom}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Managers</th>
              </tr>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager._id}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{manager.nom} {manager.prenom}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{manager.email}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {!manager.isActive ? (
                      <>
                        <button
                          onClick={() => handleToggleActiveManager(manager._id, true)}
                          style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px',
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Activate
                        </button>
                        <button
                          onClick={() => handleToggleActiveManager(manager._id, false)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} /> Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDeleteUser(manager._id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal show={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
    </div>
  );
}

export default FilterableUsers;
