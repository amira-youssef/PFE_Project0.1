const Rent = require('../models/Rent');
const Vehicle = require('../models/Vehicle');

// Function to create a new rent
const createRent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      licenseNumber,
      dateOfBirth,
      nationality,
      drivingExperience,
      pickupLocation,
      pickupDateTime,
      returnLocation,
      returnDateTime,
      carId,
      paymentMethod,
      relationshipToRenter,
      emergencyContact,
      userId,
      price
    } = req.body;

    // Check if pickup and return dates are in the past
    const now = new Date();
    if (new Date(pickupDateTime) < now || new Date(returnDateTime) < now) {
      return res.status(400).json({ success: false, message: 'Pickup or return date cannot be in the past' });
    }

    // Create new rent instance
    const rent = new Rent({
      personalInformation: {
        fullName,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipCode
      },
      driverInformation: {
        licenseNumber,
        dateOfBirth,
        nationality,
        drivingExperience
      },
      pickupLocation,
      pickupDateTime,
      returnLocation,
      returnDateTime,
      carId,
      paymentMethod,
      relationshipToRenter,
      emergencyContact,
      userId,
      price
    });

    // Increment count field in Vehicle model
    await Vehicle.findByIdAndUpdate(carId, { $inc: { count: 1 } });

    // Save rent entry to database
    await rent.save();

    res.status(201).json({ success: true, message: 'Rent created successfully' });
  } catch (error) {
    console.error('Error creating rent:', error);
    res.status(500).json({ success: false, message: 'Failed to create rent', error: error.message });
  }
};

module.exports = { createRent };
