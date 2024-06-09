import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../style/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Login successful:', response.data);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userData', JSON.stringify(response.data.user || response.data.token));

      const userData = response.data.user;
      const role = userData.role;
      const agencyId = userData.agencyId;

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'manager') {
        if (agencyId) {
          navigate('/managerDashboard');
        } else {
          navigate('/agencyForm');
        }
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
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
    </div>
  );
};

export default LoginPage;
