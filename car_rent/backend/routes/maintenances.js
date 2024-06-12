const express = require('express');
const maintenanceController = require('../controllers/maintController');
const router = express.Router();


router.post('/create', maintenanceController.createMaintenance);
router.get('/getMaintDatesByVehicleId/:vehicleId', maintenanceController.getMaintDatesByVehicleId);
router.get('/getTotalPrice/:vehicleId', maintenanceController.getTotalMaintenanceCostByVehicleId);
router.delete('/delete/:id', maintenanceController.deleteMaintenanceById);
router.get('/getAll', maintenanceController.getAllMaintenances);
router.get('/getById/:id', maintenanceController.getMaintenanceById);
router.get('/getAllByManager/:managerId', maintenanceController.getAllMaintenancesByManagerId);
router.put('/update/:id', maintenanceController.updateMaintenance);
router.get('/totalPastMaintenancePrice', maintenanceController.getTotalPastMaintenancePrice);


module.exports = router;
