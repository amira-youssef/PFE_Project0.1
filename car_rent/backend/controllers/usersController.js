const User = require('../models/User');
const mongoose = require('mongoose');
const sendEmail = require('../services/emailService')



const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getUserById = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getManagers = async (req, res) => {
    try {
      const managers = await User.find({ role: 'manager' }); // No need for .toArray()
      res.json(managers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
  };


  const updateUser = async (req, res) => {
    const { nom, prenom, email, password, birthdate } = req.body; 
  
    try {
      // Find the user to update by ID (replace with your actual logic to identify the user)
      const userId = req.params.userId; 
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user properties (only update properties that are provided)
      user.nom = nom || user.nom; 
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
      user.password = password || user.password; 
      user.birthdate = birthdate || user.birthdate;
  
      // Save the updated user document
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
  };
  
  const updateManager = async (req, res) => {
    const { nom, prenom, email, password, birthdate, agence, numTel, buisnessEmail } = req.body; 
  
    try {
      const userId = req.params.userId; 
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
  
      // Hash password if provided
      if (password) {
        user.password = await hashPassword(password); 
      }
  
      user.birthdate = birthdate || user.birthdate;
      user.agence = agence || user.agence;
      user.numTel = numTel || user.numTel;
      user.buisnessEmail = buisnessEmail || user.buisnessEmail;
  
     
  
      // Save the updated user document
      const updatedManager = await user.save();
  
      res.json(updatedManager);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  const toggleActive = async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const emailSubject = isActive ? 'Account Activation' : 'Account Rejection';
      const emailMessage = isActive 
        ? 'Your account has been activated. You can now log in and start using the system.'
        : 'Your account activation request has been rejected. Please contact support for more information.';
  
      await sendEmail(user.email, emailSubject, emailMessage);
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {getUsers , getManagers , deleteUser , getUserById ,updateUser , updateManager , toggleActive} ;