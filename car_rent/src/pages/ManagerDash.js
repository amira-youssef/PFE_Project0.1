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
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import Chart from '../components/dashboardC/Chart';
import Deposits from '../components/dashboardC/Deposits';
import Orders from '../components/dashboardC/Orders';
import Info from '../components/dashboardC/Info';
import Stats from '../components/dashboardC/Stats';
import FilterableCards from '../components/dashboardC/CarsTab/FilterableCards';
import AddCarModal from '../components/dashboardC/CarsTab/AddCarModal';
import FilterableMaintenances from '../components/dashboardC/MaintTab/FilterableMaintenances';

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
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  React.useEffect(() => {
    if (!userData?.agencyId) {
      navigate('/agencyForm');
    }
  }, [userData, navigate]);

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
      <Box className="side-nav" sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box  sx={{ width: '25%', padding: 2, pt: 4, margin: '16px',
        marginTop: '48px', 'backgroundColor': '#fff', height: 'fit-content',
         'borderRadius': '10px',display: 'flex', flexDirection: 'column', gap:'8%' }}>
            <Info />
            
            <Stats />
        </Box>
        <Box sx={{ width: '75%'}}>
          <Tabs value={value} onChange={handleChange} style={{'fontWeight':'bold'}} textColor="secondary" indicatorColor="secondary" centered>
            <Tab value="one" label="Dashboard" />
            <Tab value="two" label="Cars" />
            <Tab value="three" label="Maintenance" />
          </Tabs>
          {value === 'one' && (
            <Box sx={{ padding: 4, 'backgroundColor': '#fff', minHeight: 'calc(100vh - 48px)', 'borderRadius': '10px 0 0 0'}}>
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
            <Box sx={{ padding: 4, 'backgroundColor': '#fff', minHeight: 'calc(100vh - 48px)', 'borderRadius': '10px 0 0 0' }}>
              <div  style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
              <h3>List of Cars</h3>
              <div>
              <Button  variant="contained" color="primary" style={{'backgroundColor': '#ff4d30'}} onClick={handleOpenAddCarModal}>
                Add New Car
              </Button></div>
              </div>
              <FilterableCards />
              <AddCarModal show={isAddCarModalOpen} onClose={handleCloseAddCarModal} />
            </Box>
          )}
          {value === 'three' && (
            <Box sx={{ padding: 4, 'backgroundColor': '#fff', minHeight: 'calc(100vh - 48px)', 'borderRadius': '10px 0 0 0' }}>
              <FilterableMaintenances />
            </Box>
          )}
        </Box>
      </Box>
      <style jsx>{`
        .side-nav {
        background-color:rgb(255 77 48 / 10%);
        }
        
      `}</style>
    </ThemeProvider>
  );
}
