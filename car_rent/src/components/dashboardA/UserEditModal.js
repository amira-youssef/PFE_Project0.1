import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const UserEditModal = ({ isOpen, toggle, userId, fetchUsers }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    birthdate: ''
  });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/getUserById/${userId}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/updateU/${userId}`, formData);
      fetchUsers();
      toggle();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-overlay">
      <div className="modal">
        <ModalHeader className="modal-header" toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nom">First Name</Label>
              <Input type="text" name="nom" id="nom" value={formData.nom} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="prenom">Last Name</Label>
              <Input type="text" name="prenom" id="prenom" value={formData.prenom} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="birthdate">Birthdate</Label>
              <Input type="date" name="birthdate" id="birthdate" value={formData.birthdate} onChange={handleChange} />
            </FormGroup>
            <Button type="submit" color="primary" className="submit-button">Save</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default UserEditModal;
