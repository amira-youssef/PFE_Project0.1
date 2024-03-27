const express = require('express');
const mongoose = require('mongoose');


const app= express(); 
const PORT= process.env.PORT || 5000;


mongoose.connect('mongodb://localhost:27017/car_rent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  