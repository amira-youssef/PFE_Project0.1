import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Title from './Title';
import axios from 'axios';

// Generate Rent Data
function createData(id, date, renterName, pickupLocation, paymentMethod, amount , status) {
  return { id, date, renterName, pickupLocation, paymentMethod, amount ,status };
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
}, );


  const handleExpandClick = (id) => {
    console.log(`Expand clicked for row with id: ${id}`);
    // Implement expand functionality here
  };

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
      const response = await axios.delete(`http://localhost:5000/api/rents/deleteRent/${id}`);
      if (response.status === 200) {
        // Remove the deleted rent from the state
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error('Error deleting rent:', error);
    }
  };


  return (
    <React.Fragment>
      <Title>Rent Requests</Title>
      <Table size="small" style={{ height: '450px'}}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.renterName}</TableCell>
              <TableCell>{row.pickupLocation}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount.toFixed(2)}`}</TableCell>
              <TableCell>{row.status}</TableCell> {/* Display the status */}
              <TableCell align="right">
                <IconButton onClick={() => handleAcceptClick(row.id)} aria-label="accept">
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => handleDiscardClick(row.id)} aria-label="discard">
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
