const express = require('express');
const vehiclesController = require('../controllers/vehiclesController'); // Replace with your controller path

const router = express.Router();

// Routes for vehicles
router.get('/getAll', vehiclesController.getVehicles);
router.get('/:id/getById', vehiclesController.getVehicleById);
router.post('/create', vehiclesController.createVehicle);
router.put('/:id/update', vehiclesController.updateVehicle);
router.delete('/:id/delete', vehiclesController.deleteVehicle);

module.exports = router;