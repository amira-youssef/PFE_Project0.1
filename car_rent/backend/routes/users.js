const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login' , authController.login ) ; 
router.post('/registerU' , authController.registerUser ) ; 
router.post('/registerM' , authController.registerAgencyManager) ; 

module.exports = router ; 
