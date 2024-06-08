const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const { default: mongoose } = require('mongoose');


const createMaintenance = async (req, res) => {
    const { vehicleId, managerId, startDate, endDate, type, price } = req.body;
  
    // Basic validation
    if (!vehicleId || !managerId || !startDate || !endDate || !type || !price) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    try {
      const newMaintenance = new Maintenance({
        vehicleId,
        managerId,
        startDate,
        endDate,
        type,
        price
      });
  
      const savedMaintenance = await newMaintenance.save();
      res.status(201).json(savedMaintenance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const getMaintDatesByVehicleId = async (req, res) => {
  const { vehicleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const maintenances = await Maintenance.find({ vehicleId, hidden: false }).select('type startDate endDate');
    console.log("Fetched maintenances:", maintenances);

    const formattedMaintenances = maintenances.map(maintenance => ({
      maintenanceType: maintenance.type,
      startDate: maintenance.startDate,
      endDate: maintenance.endDate
    }));

    return res.status(200).json(formattedMaintenances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getTotalMaintenanceCostByVehicleId = async (req, res) => {
  const { vehicleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const maintenances = await Maintenance.find({ vehicleId }).select('price');

    if (!maintenances.length) {
      return res.status(404).json({ message: 'No maintenance records found for this vehicle.' });
    }

    const totalCost = maintenances.reduce((acc, maintenance) => acc + parseFloat(maintenance.price), 0);

    return res.status(200).json({ totalCost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteMaintenanceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid maintenance ID format' });
  }

  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    if (!deletedMaintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    return res.status(200).json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all maintenances for all vehicles
const getAllMaintenances = async (req, res) => {
  try {
    // Fetch all maintenance records and populate the vehicleId field to get the mainImage
    const maintenances = await Maintenance.find().populate('vehicleId', 'mainImage');

    if (!maintenances.length) {
      return res.status(404).json({ message: 'No maintenance records found' });
    }

    return res.status(200).json(maintenances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get maintenance by maintenance ID
const getMaintenanceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid maintenance ID format' });
  }

  try {
    const maintenance = await Maintenance.findById(id);

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    return res.status(200).json(maintenance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAllMaintenancesByManagerId = async (req, res) => {
  try {
    const managerId = req.params.managerId;

    if (!mongoose.Types.ObjectId.isValid(managerId)) {
      return res.status(400).json({ message: 'Invalid manager ID format' });
    }

    // Fetch maintenances by manager ID and populate vehicle details
    const maintenances = await Maintenance.find({ managerId })
      .populate('vehicleId', 'mainImage');

    if (!maintenances.length) {
      return res.status(404).json({ message: 'No maintenance records found for this manager.' });
    }

    // Transform data to include mainImage from vehicle
    const transformedMaintenances = maintenances.map(maintenance => ({
      _id: maintenance._id,
      vehicleId: maintenance.vehicleId._id,
      managerId: maintenance.managerId,
      startDate: maintenance.startDate,
      endDate: maintenance.endDate,
      type: maintenance.type,
      price: maintenance.price,
      mainImage: maintenance.vehicleId.mainImage,
      hidden: maintenance.hidden,
    }));

    return res.status(200).json(transformedMaintenances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const updateMaintenance = async (req, res) => {
  try {
    const maintenanceId = req.params.id;
    const { type, startDate, endDate, price } = req.body;

    const maintenance = await Maintenance.findByIdAndUpdate(
      maintenanceId,
      { type, startDate, endDate, price },
      { new: true, runValidators: true }
    );

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    return res.status(200).json(maintenance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
 
  module.exports ={
    createMaintenance , 
    getMaintDatesByVehicleId ,
    getTotalMaintenanceCostByVehicleId , 
    deleteMaintenanceById ,
    getAllMaintenances , 
    getMaintenanceById , 
    getAllMaintenancesByManagerId,
    updateMaintenance}

  