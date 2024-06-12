import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Hero from '../components/homepage/Hero';

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
    <><Hero />
   
    </>
  );
};

export default Homepage;
