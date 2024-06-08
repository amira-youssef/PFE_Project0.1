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

// Generate Rent Data
function createData(id, date, renterName, pickupLocation, paymentMethod, amount, status) {
  return { id, date, renterName, pickupLocation, paymentMethod, amount, status };
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
      const response = await axios.patch(`http://localhost:5000/api/rents/updateStatus/${id}`, { status: 'discarded' });
      if (response.status === 200) {
        // Update the state to reflect the new status
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, status: 'discarded' } : row
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <React.Fragment>
      <Title>Rent Requests</Title>
      <Table size="small" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid gray' }}>Date</TableCell>
            <TableCell sx={{ border: '1px solid gray' }}>Name</TableCell>
            <TableCell sx={{ border: '1px solid gray' }}>Ship To</TableCell>
            <TableCell sx={{ border: '1px solid gray' }}>Payment Method</TableCell>
            <TableCell sx={{ border: '1px solid gray' }} align="right">Sale Amount</TableCell>
            <TableCell sx={{ border: '1px solid gray' }}>Status</TableCell>
            <TableCell sx={{ border: '1px solid gray' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor:
                  row.status === 'accepted' ? 'green' :
                  row.status === 'pending' ? 'yellow' :
                  row.status === 'discarded'||'suspended'? 'red' : 'white',
                color: row.status === 'pending' ? 'black' : 'white',
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell sx={{ border: '1px solid gray' }}>{row.date}</TableCell>
              <TableCell sx={{ border: '1px solid gray' }}>{row.renterName}</TableCell>
              <TableCell sx={{ border: '1px solid gray' }}>{row.pickupLocation}</TableCell>
              <TableCell sx={{ border: '1px solid gray' }}>{row.paymentMethod}</TableCell>
              <TableCell sx={{ border: '1px solid gray' }} align="right">{`${row.amount.toFixed(2)} DT`}</TableCell>
              <TableCell sx={{ border: '1px solid gray' }}>{row.status}</TableCell> {/* Display the status */}
              <TableCell sx={{ border: '1px solid gray' }} align="right">
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
