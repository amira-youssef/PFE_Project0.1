const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance'); 
const Rent = require('../models/Rent');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload failed', error: err });
    } else if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err });
    }
    res.json({ path: req.file.path });
  });
};






const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ hidden: false });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




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






const createVehicle = async (req, res) => {
  const { maker, model, year, capacity, type, description, pricePerDay, boite, agencyId, image1, image2, image3, mainImage, address } = req.body;

  if (!maker || !model || !year || !capacity || !type || !description || !pricePerDay || !boite || !image1 || !image2 || !image3 || !mainImage || !address) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const validationErrors = [];

  if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    validationErrors.push('Year must be a valid number between 1900 and current year');
  }

  if (isNaN(capacity) || capacity <= 0) {
    validationErrors.push('Capacity must be a positive integer');
  }

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
    capacity,
    type,
    description,
    pricePerDay,
    agencyId,
    boite,
    image1,
    image2,
    image3,
    mainImage,
    address,
  });

  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
    console.log("Vehicle Created Successfully !!");
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};





const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { maker, model, year, boite, capacity, type, description, image, pricePerDay, agencyId } = req.body;

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

  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate({ _id: id }, update, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





const getVehiclesByAgencyId = async (req, res) => {
  try {
    const agencyId = req.params.agencyId;
    console.log(`Fetching vehicles for agencyId: ${agencyId}`);

    if (!mongoose.Types.ObjectId.isValid(agencyId)) {
      console.log('Invalid agency ID format');
      return res.status(400).json({ message: 'Invalid agency ID format' });
    }

    const vehicles = await Vehicle.find({ agencyId: agencyId });
    console.log(`Vehicles found: ${vehicles.length}`);

    if (!vehicles.length) {
      console.log('No vehicles found for this agency.');
      return res.status(404).json({ message: 'No vehicles found for this agency.' });
    }

    return res.status(200).json(vehicles);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const hideVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.hidden = true;
    await vehicle.save();

    const now = new Date();

    await Maintenance.updateMany(
      { vehicleId: id, endDate: { $gte: now } },
      { $set: { hidden: true, status: 'suspended' } }
    );

    await Rent.updateMany(
      { vehicleId: id, returnDateTime: { $gte: now } },
      { $set: { hidden: true, status: 'suspended' } }
    );

    res.json({ message: 'Vehicle, associated maintenances, and rents hidden successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchVehicles = async (req, res) => {
  const { agencyId, type, pickupDate, dropoffDate } = req.query;

  if (!agencyId || !type || !pickupDate || !dropoffDate) {
    return res.status(400).json({ error: 'agencyId, type, pickupDate, and dropoffDate are required' });
  }

  try {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    console.log('Received search parameters:', { agencyId, type, pickup, dropoff });

    const vehicles = await Vehicle.find({ agencyId: new mongoose.Types.ObjectId(agencyId), type: type });
    console.log('Vehicles found:', vehicles);

    const availableVehicles = await Promise.all(
      vehicles.map(async (vehicle) => {
        const vehicleId = vehicle._id;

        const overlappingRents = await Rent.find({
          vehicleId: vehicleId,
          $or: [
            {
              $and: [
                { pickupDateTime: { $lt: dropoff } },
                { returnDateTime: { $gt: pickup } }
              ]
            }
          ]
        });

        const overlappingMaintenances = await Maintenance.find({
          vehicleId: vehicleId,
          $or: [
            {
              $and: [
                { startDate: { $lt: dropoff } },
                { endDate: { $gt: pickup } }
              ]
            }
          ]
        });

        if (overlappingRents.length === 0 && overlappingMaintenances.length === 0) {
          return vehicle;
        }
        return null;
      })
    );

    const filteredVehicles = availableVehicles.filter(vehicle => vehicle !== null);
    res.json(filteredVehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



const getNumberOfVehiclesByAgencyId = async (req, res) => {
  const { agencyId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(agencyId)) {
    return res.status(400).json({ message: 'Invalid agency ID' });
  }

  try {
    const count = await Vehicle.countDocuments({ agencyId, hidden: false });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching number of vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  getVehiclesByAgencyId,
  uploadFile,
  hideVehicle,
  getNumberOfVehiclesByAgencyId,
  searchVehicles
};
