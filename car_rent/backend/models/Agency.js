const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: { 
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: { 
    type: String
  },
  zipCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  rating: { 
    type: Number, 
    default: 0 
  },
  numRatings: { 
    type: Number, 
    default: 0 
  },
  logo: {
    type: String
  }
 
});

const Agency = mongoose.model('Agency', AgencySchema);
 module.exports = Agency ; 
