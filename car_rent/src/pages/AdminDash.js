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
import FilterableUsers from '../components/dashboardA/FilterableUsers';
import FilterableAgencies from '../components/dashboardA/FilterableAgencies';
import FilterableTestimonials from '../components/dashboardA/FilterableTestimonials';
import AddUserModal from '../components/dashboardA/AddUserModal';
import AddAgencyModal from '../components/dashboardA/AddAgencyModal';

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

export default function AdminDash() {
  const [value, setValue] = React.useState('one');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [isAddAgencyModalOpen, setIsAddAgencyModalOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleOpenAddAgencyModal = () => {
    setIsAddAgencyModalOpen(true);
  };

  const handleCloseAddAgencyModal = () => {
    setIsAddAgencyModalOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          sx={{
            width: 240,
            height: '100vh',
            backgroundColor: 'primary.dark',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography variant="h6" color="white" gutterBottom>
            Admin Sidebar
          </Typography>
          <button className="sidebar-button" onClick={handleOpenAddUserModal}>
            Add User
          </button>
          <button className="sidebar-button" onClick={handleOpenAddAgencyModal}>
            Add Agency
          </button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
            <Tab value="one" label="Users" />
            <Tab value="two" label="Agencies" />
            <Tab value="three" label="Testimonials" />
          </Tabs>
          {value === 'one' && (
            <Box sx={{ padding: 2 }}>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" gutterBottom>
                        Manage Users
                      </Typography>
                      <FilterableUsers />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          )}
          {value === 'two' && (
            <Box sx={{ padding: 2 }}>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" gutterBottom>
                        Manage Agencies
                      </Typography>
                      <FilterableAgencies />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          )}
          {value === 'three' && (
            <Box sx={{ padding: 2 }}>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" gutterBottom>
                        Manage Testimonials
                      </Typography>
                      <FilterableTestimonials />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          )}
        </Box>
      </Box>
      <AddUserModal show={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
      <AddAgencyModal show={isAddAgencyModalOpen} onClose={handleCloseAddAgencyModal} />
      <style jsx>{`
        .sidebar-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          margin: 10px 0;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        .sidebar-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </ThemeProvider>
  );
}
