const express= require('express'); 
const rentController = require('../controllers/rentController'); 
const router = express.Router();

router.post('/create/:userId/:vehicleId' , rentController.createRent); 
router.get('/getAllbyAgency/:agencyId', rentController.getRentsByAgencyId);
router.get('/getAllByVehicle/:vehicleId', rentController.getRentsByVehicleId);
router.get('/getAllByUser/:userId', rentController.getRentsByUserId);
router.patch('/updateStatus/:id', rentController.updateRentStatus);
router.delete('/deleteRent/:id', rentController.deleteRent);
router.get('/getRentDates/:vehicleId', rentController.getRentDatesByVehicleId);

module.exports = router;