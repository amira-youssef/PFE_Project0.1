import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import AddUserModal from './AddUserModal';
import UserEditModal from './UserEditModal';
import ManagerEditModal from './ManagerEditModal';

function FilterableUsers() {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [isManagerEditModalOpen, setIsManagerEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const handleOpenUserEditModal = (userId) => {
    setSelectedUserId(userId);
    setIsUserEditModalOpen(true);
  };

  const handleCloseUserEditModal = () => {
    setIsUserEditModalOpen(false);
    setSelectedUserId(null);
    fetchUsers();
  };

  const handleOpenManagerEditModal = (userId) => {
    setSelectedUserId(userId);
    setIsManagerEditModalOpen(true);
  };

  const handleCloseManagerEditModal = () => {
    setIsManagerEditModalOpen(false);
    setSelectedUserId(null);
    fetchUsers();
  };

  const handleToggleActiveManager = async (userId, isActive) => {
    const confirmationMessage = isActive
      ? 'Are you sure you want to activate this manager?'
      : 'Are you sure you want to deactivate this manager?';

    if (window.confirm(confirmationMessage)) {
      try {
        await axios.patch(`http://localhost:5000/api/users/toggleActive/${userId}`, { isActive });
        fetchUsers();
      } catch (error) {
        console.error(`Error ${isActive ? 'activating' : 'deactivating'} manager:`, error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr>
                <th colSpan="3" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Users</th>
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
                      onClick={() => handleOpenUserEditModal(user._id)}
                      style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
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
                <th colSpan="3" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Managers</th>
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
                    <button
                      onClick={() => handleToggleActiveManager(manager._id, !manager.isActive)}
                      style={{
                        backgroundColor: manager.isActive ? '#28a745' : '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    >
                      <FontAwesomeIcon icon={manager.isActive ? faCheck : faTimes} />
                    </button>
                    <button
                      onClick={() => handleOpenManagerEditModal(manager._id)}
                      style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal show={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
      <UserEditModal isOpen={isUserEditModalOpen} toggle={handleCloseUserEditModal} userId={selectedUserId} fetchUsers={fetchUsers} />
      <ManagerEditModal isOpen={isManagerEditModalOpen} toggle={handleCloseManagerEditModal} userId={selectedUserId} fetchUsers={fetchUsers} />
    </div>
  );
}

export default FilterableUsers;
