import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  ButtonGroup,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Title from './Title';

export default function Chart() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState('daily');
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem('userData'));

  const fetchData = async (interval) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/rents/revenuePerInterval/${interval}/${userData.agencyId}`);
      const formattedData = response.data.map(item => ({
        time: item._id,
        amount: item.totalAmount,
      }));
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [interval]);

  return (
    <React.Fragment>
      <Title>Rent Data</Title>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" sx={{ mb: 2 }}>
        <Button onClick={() => setInterval('daily')} size="small">Day</Button>
        <Button onClick={() => setInterval('weekly')} size="small">Week</Button>
        <Button onClick={() => setInterval('monthly')} size="small">Month</Button>
        <Button onClick={() => setInterval('yearly')} size="small">Year</Button>
      </ButtonGroup>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 20,
                left: 20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </React.Fragment>
  );
}
