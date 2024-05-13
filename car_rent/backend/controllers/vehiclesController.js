const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle'); // Replace with your vehicle model path
// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific vehicle by ID
const getVehicleById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
    const { maker, model, year,boite ,capacity, type, description, image, pricePerDay, agencyId } = req.body;

    // Basic validation
    if (!maker || !model || !year || !capacity || !boite || !type || !description || !image || !pricePerDay || !agencyId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    // Additional validation
    const validationErrors = [];
  
    // Year validation (replace with your desired logic)
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      validationErrors.push('Year must be a valid number between 1900 and current year');
    }
  
    // Capacity validation (replace with your desired logic)
    if (isNaN(capacity) || capacity <= 0) {
      validationErrors.push('Capacity must be a positive integer');
    }
  
    // Price per day validation (replace with your desired logic)
    if (isNaN(pricePerDay) || pricePerDay <= 0) {
      validationErrors.push('Price per day must be a positive number');
    }
  
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: validationErrors.join(', ') });
    }
  
    const newVehicle = new Vehicle({
      maker,
      model,
      year,
      boite,
      capacity,
      type,
      description,
      image,
      pricePerDay,
      agencyId
    });
  
    try {
      const savedVehicle = await newVehicle.save();
      res.status(201).json(savedVehicle);
    } catch (error) {
      // Handle potential Mongoose validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      // Handle other errors
      res.status(500).json({ message: error.message });
    }
  
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { maker, model, year, boite ,capacity, type, description, image, pricePerDay, agencyId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }

  const update = {
    maker,
    model,
    year,
    boite,
    capacity,
    type,
    description,
    image,
    pricePerDay,
    agencyId
  };

  // Use findOneAndUpdate with options to return the updated document
  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate({ _id: id }, update, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Potentially handle specific Mongoose validation errors
  }
};

// Delete a vehicle by ID
const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = {getVehicles ,getVehicleById ,createVehicle, updateVehicle ,deleteVehicle};
