const express = require('express');
const vehiclesController = require('../controllers/vehiclesController'); // Replace with your controller path

const router = express.Router();

// Routes for vehicles
router.get('/getAll', vehiclesController.getVehicles);
router.get('/getById/:id', vehiclesController.getVehicleById);
router.get('/getByAgId/:agencyId', vehiclesController.getVehiclesByAgencyId);
router.post('/create', vehiclesController.createVehicle);
router.put('/update/:id', vehiclesController.updateVehicle);
router.post('/upload', vehiclesController.uploadFile);
router.put('/hide/:id', vehiclesController.hideVehicle);

router.get('/countByAgency/:agencyId', vehiclesController.getNumberOfVehiclesByAgencyId  );


module.exports = router;