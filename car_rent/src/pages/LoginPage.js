import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import '../style/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);

      const userData = response.data.user;
      const role = userData.role;
      const agencyId = userData.agencyId;
      const isActive = userData.isActive;

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'manager') {
        if (!isActive) {
          setModalMessage('Your account is not activated. Check your email inbox in the next few days!');
          toggleModal();
          return;
        } else if (agencyId) {
          navigate('/managerDashboard');
        } else {
          navigate('/agencyForm');
        }
      } else {
        navigate('/home');
      }

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userData', JSON.stringify(response.data.user || response.data.token));

    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setModalMessage(error.response.data.message || 'An unexpected error occurred. Please try again later.');
      } else {
        setModalMessage('An unexpected error occurred. Please try again later.');
      }
      toggleModal();
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-group">
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" className="login-button">
          Login
        </Button>
      </Form>
      <div className="sign-in-link">
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>

      <Modal isOpen={modal} toggle={toggleModal} centered className="custom-modal">
        <ModalHeader toggle={toggleModal}>Login Information</ModalHeader>
        <ModalBody>
          {modalMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>

      <style>
        {`
          .custom-modal .modal-content {
            background-color: #f5f5f5;
            border-radius: 10px;
            padding: 20px;
            border: none;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }

          .custom-modal .modal-header {
            border-bottom: none;
            display: flex;
            justify-content: center;
            padding-bottom: 0;
          }

          .custom-modal .modal-header .close {
            margin: -1rem -1rem -1rem auto;
          }

          .custom-modal .modal-body {
            text-align: center;
            font-size: 1.1rem;
            color: #333;
          }

          .custom-modal .modal-footer {
            border-top: none;
            display: flex;
            justify-content: center;
            padding-top: 0;
          }

          .custom-modal .btn-secondary {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff;
          }

          .custom-modal .btn-secondary:hover {
            background-color: #0056b3;
            border-color: #004085;
          }

          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #f7f7f7;
            padding: 20px;
          }

          .login-container h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }

          .form-group label {
            font-weight: bold;
          }

          .login-button {
            background-color: #007bff;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
            color: white;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .login-button:hover {
            background-color: #0056b3;
          }

          .sign-in-link p {
            margin-top: 20px;
            font-size: 1rem;
          }

          .sign-in-link a {
            color: #007bff;
            text-decoration: none;
          }

          .sign-in-link a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
