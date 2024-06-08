import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const UserProfile = () => {
  const [rents, setRents] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rents/getAllByUser/${userData._id}`);
        setRents(response.data);
      } catch (error) {
        console.error('Error fetching rents:', error);
      }
    };

    fetchRents();
  }, [userData._id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              User Information
            </Typography>
            <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {userData.address}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Rents
            </Typography>
            <List>
              {rents.length > 0 ? (
                rents.map((rent) => {
                  const { maker, model, mainImage } = rent;
                  return (
                    <ListItem key={rent._id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={`http://localhost:5000/${mainImage}`} alt={`${maker} ${model}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Vehicle: ${maker} ${model}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textPrimary">
                              Pickup: {new Date(rent.pickupDateTime).toLocaleString()}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              Return: {new Date(rent.returnDateTime).toLocaleString()}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              Status: {rent.status}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })
              ) : (
                <Typography variant="body2">No rents found.</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
