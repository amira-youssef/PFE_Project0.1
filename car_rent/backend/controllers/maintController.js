const express = require('express');
const router = express.Router();
const Maintenance = require('./models/maintenance');

// Fetch maintenance periods
router.get('/maintenance/:vehicleId', async (req, res) => {
    try {
      const maintenanceRecords = await Maintenance.find({ vehicleId: req.params.vehicleId });
      res.json(maintenanceRecords);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  