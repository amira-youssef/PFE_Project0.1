import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../style/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Use email instead of username
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Simulate login API call (replace with your actual API call)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login', // Corrected URL
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Login successful:', response.data);

      // Set isLoggedIn to true and store it in local storage
      localStorage.setItem('isLoggedIn', true);

      // Consider storing only necessary user info or a token in local storage
      localStorage.setItem('userData', JSON.stringify(response.data.user || response.data.token)); // Example

      // Redirect based on isAdmin status
      const role = response.data.role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'manager') {
        navigate('/manager');
      } else if (role === 'user') {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
    }
  };

  return (
    <div className="container">
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
        <Button type="submit">
          Login
        </Button>
      </Form>
      <div className="sign-in-link">
        <p>Already have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
