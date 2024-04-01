const express = require('express');
const vehiclesController = require('./controllers/vehiclesController'); // Replace with your controller path

const router = express.Router();

// Routes for vehicles
router.get('/', vehiclesController.getVehicles);
router.get('/:id', vehiclesController.getVehicleById);
router.post('/', vehiclesController.createVehicle);
router.put('/:id', vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;