const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 

  driverInformation: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    },
    licenseNumber: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
  },

  
  emergencyContact: {
    name: {
      type: String,

    },
    phoneNumber: {
      type: String,
    },
    relationshipToRenter: {
      type: String,
      enum: ['family' , 'friend' ],
    },
  }, 

  pickupLocation: {
    type: String,
    required: true
  },
  pickupDateTime: {
    type: Date,
    required: true
  },
  returnLocation: {
    type: String,
    required: true
  },
  returnDateTime: {
    type: Date,
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: [ 'sur place'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected','suspended'],
  },
  hidden: { type: Boolean, default: false },

});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;
