const express = require('express');
const mongoose = require('mongoose');
const userRoute = require ('./routes/users'); 
const vehicleRoute = require ('./routes/vehicles'); 
const agencyRoute = require('./routes/agencies');
const rentRoute = require('./routes/rents');
const cors = require('cors');

const app= express(); 
const PORT= process.env.PORT || 5000;


mongoose.connect('mongodb://localhost:27017/car_rent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // specify the allowed HTTP methods
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with options
app.use(cors(corsOptions));
app.use('/api/users', userRoute); 
app.use('/api/vehicles', vehicleRoute); 
app.use('/api/agencies', agencyRoute) ; 
app.use('/api/rents', rentRoute) ; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  