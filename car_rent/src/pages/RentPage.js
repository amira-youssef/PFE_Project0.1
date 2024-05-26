import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RentForm from '../components/rentClient/RentForm';

const RentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Rent a Car</h1>
      <RentForm />
    </div>
  );
};

export default RentPage;
