import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your search logic here using the startDate, endDate, and pickUpLocation values
    console.log('Search submitted:', startDate, endDate, pickUpLocation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="start-time"
            label="Start Time"
            type="time"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="end-date"
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="end-time"
            label="End Time"
            type="time"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="pick-up-location"
            label="Pick-up Location"
            type="text"
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
