const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInformation: {
    fullName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      streetAddress: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      }
    }
  },
  driverInformation: {
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
  carID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['en ligne', 'sur place'],
    required: true
  },
  relationshipToRenter: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  }
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;
