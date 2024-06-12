const express = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.post('/login' , authController.login ) ; 
router.post('/registerU' , authController.registerUser ) ; 
router.post('/registerM' , authController.registerAgencyManager) ; 

router.get('/allUsers' , usersController.getUsers) ;
router.get('/getUserById/:id' , usersController.getUserById) ;
router.get('/allManagers' , usersController.getManagers) ;
router.delete('/:id/deleteUser' , usersController.deleteUser) ;
router.put('/updateU/:id' , usersController.updateUser) ;
router.put('/updateM/:id' , usersController.updateManager) ;
router.patch('/toggleActive/:userId', usersController.toggleActive);

module.exports = router ; 
