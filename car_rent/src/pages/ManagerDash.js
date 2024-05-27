import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Chart from '../components/dashboardC/Chart';
import Deposits from '../components/dashboardC/Deposits';
import Orders from '../components/dashboardC/Orders';
import Info from '../components/dashboardC/Info';
import Stats from '../components/dashboardC/Stats';
import FilterableCards from '../components/dashboardC/CarsTab/FilterableCards';
import AddCarModal from '../components/dashboardC/CarsTab/'; // Ensure the import path is correct
import '../components/dashboardC/CarsTab/style/main.css';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function ManagerDash() {
  const [value, setValue] = React.useState('one');
  const [isAddCarModalOpen, setIsAddCarModalOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenAddCarModal = () => {
    setIsAddCarModalOpen(true);
  };

  const handleCloseAddCarModal = () => {
    setIsAddCarModalOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box sx={{ width: '25%', padding: 2, pt: 4 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto' }}>
            <Info />
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto', mt: 2 }}>
            <Stats />
          </Paper>
        </Box>
        <Box sx={{ width: '75%' }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
            <Tab value="one" label="Dashboard" />
            <Tab value="two" label="Cars" />
          </Tabs>
          {value === 'one' && (
            <Box sx={{ padding: 2 }}>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                      <Chart />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                      <Deposits />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Orders />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          )}
          {value === 'two' && (
            <Box sx={{ padding: 2 }}>
              <button className="add-car-button" onClick={handleOpenAddCarModal}>
                Add New Car
              </button>
              <FilterableCards />
              <AddCarModal show={isAddCarModalOpen} onClose={handleCloseAddCarModal} />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
