const express= require('express'); 
const rentController = require('../controllers/rentController'); 
const router = express.Router();

router.post('/create' , rentController.createRent); 


module.exports = router;