import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Title from './Title';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

// Generate Rent Data
function createData(id, startDate, endDate, renterName, location, paymentMethod, amount, status) {
  return { id, startDate, endDate, renterName, location, paymentMethod, amount, status };
}

export default function Orders() {
  const [rows, setRows] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchData = async () => {
      const agencyId = userData?.agencyId; // Assume the agencyId is stored in local storage
      if (!agencyId) {
        console.error('No agencyId found in local storage.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/rents/getAllbyAgency/${agencyId}`);
        const data = response?.data;
        const rows = data?.map((rent) =>
          createData(
            rent?._id,
            new Date(rent?.pickupDateTime).toLocaleDateString(),
            new Date(rent?.returnDateTime).toLocaleDateString(),
            rent.driverInformation.fullName,
            rent.pickupLocation,
            rent.paymentMethod,
            rent.price,
            rent.status
          )
        );
        setRows(rows);
      } catch (error) {
        console.error('Error fetching rents:', error);
      }
    };

    fetchData();
  }, [userData?.agencyId]);

  const handleAcceptClick = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/rents/updateStatus/${id}`, { status: 'accepted' });
      if (response.status === 200) {
        // Update the state to reflect the new status
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, status: 'accepted' } : row
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDiscardClick = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/rents/updateStatus/${id}`, { status: 'rejected' });
      if (response.status === 200) {
        // Update the state to reflect the new status
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, status: 'rejected' } : row
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const statusColors = {
    accepted: '#c8e6c9', // Pastel Green
    pending: '#fff9c4', // Pastel Yellow
    rejected: '#ffcdd2', // Pastel Red
    suspended: '#ffcdd2' // Pastel Red (same as discarded)
  };

  return (
    <React.Fragment>
      <Title>Rent Requests</Title>
      <Table size="small" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid lightGray' }}>Start Date</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }}>End Date</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }}>Name</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }}>Location</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }}>Payment Method</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }} align="right">Sale Amount</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }}>Status</TableCell>
            <TableCell sx={{ border: '1px solid lightGray' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                borderLeft: `10px solid ${statusColors[row.status]}`,
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell sx={{ border: '1px solid lightGray' }}>{row.startDate}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }}>{row.endDate}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }}>{row.renterName}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }}>{row.location}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }}>{row.paymentMethod}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }} align="right">{`${row.amount.toFixed(2)} DT`}</TableCell>
              <TableCell sx={{ border: '1px solid lightGray' }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '16px',
                    backgroundColor: statusColors[row.status],
                    color: '#000',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}
                >
                  {row.status}
                </Box>
              </TableCell>
              <TableCell sx={{ border: '1px gray' }} align="right">
                <IconButton
                  onClick={() => handleAcceptClick(row.id)}
                  aria-label="accept"
                  disabled={row.status !== 'pending'}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDiscardClick(row.id)}
                  aria-label="discard"
                  disabled={row.status !== 'pending'}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={(event) => event.preventDefault()} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
