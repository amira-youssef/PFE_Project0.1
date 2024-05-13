import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FeaturedCars from '../components/homepage/FeaturedCars';
import Testimonials from '../components/homepage/Testimonials';
import FeaturedAgencies from "../components/homepage/FeaturedAgencies";
import ContactInfo from '../components/homepage/ContactInfo';
import SearchBar from '../components/homepage/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 10), // Add padding to the sides
  },
  section: {
    marginBottom: theme.spacing(4),
  },
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Search Bar Section */}
      <section className={classes.section}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <SearchBar />
          </Grid>
        </Grid>
      </section>

      {/* Featured Cars Section */}
      <section className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Featured Cars
        </Typography>
        <FeaturedCars />
      </section>

      <section className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Featured Agencies
        </Typography>
        <FeaturedAgencies />
      </section>

      {/* Call to Action Section */}
      <section className={classes.section}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" href="/cars">
              Browse Cars
            </Button>
          </Grid>
        </Grid>
      </section>

      {/* Testimonials and Contact Information Sections */}
      <section className={classes.section}>
        <Grid container spacing={8}>
          {/* Testimonials Section */}
          <Grid item xs={12} sm={6}>
            <Testimonials />
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} sm={6}>
            <ContactInfo />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Homepage;
