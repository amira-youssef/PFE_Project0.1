import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Use email instead of username
  const [password, setPassword] = useState('');

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
        window.location.href = '/adminDash';
      } else if (role === 'manager') {
        window.location.href = '/managerdash';
      } else {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
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
        <Button type="submit" color="primary">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
