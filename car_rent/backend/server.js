const express = require('express');
const mongoose = require('mongoose');
const userRoute = require ('./routes/users'); 
const vehicleRoute = require ('./routes/vehicles'); 
const agencyRoute = require('./routes/agencies');
const rentRoute = require('./routes/rents');
const maintRoute = require('./routes/maintenances')
const cors = require('cors');
const path = require('path'); 



const app= express(); 
const PORT= process.env.PORT || 5000;


app.use('/uploads', express.static('uploads')); 


mongoose.connect('mongodb://localhost:27017/car_rent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  optionsSuccessStatus: 204, 
};




app.use(cors(corsOptions));
app.use('/api/users', userRoute); 
app.use('/api/vehicles', vehicleRoute); 
app.use('/api/agencies', agencyRoute) ; 
app.use('/api/rents', rentRoute) ; 
app.use('/api/maint', maintRoute) ; 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

