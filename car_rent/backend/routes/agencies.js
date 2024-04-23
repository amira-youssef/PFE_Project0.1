const express= require('express'); 
const agencyController = require('../controllers/agencyController'); 
const router = express.Router();

router.post('/create/:userId' , agencyController.createAgency); 


module.exports = router;