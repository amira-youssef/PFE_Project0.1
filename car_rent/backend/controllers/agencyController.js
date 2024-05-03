const asyncHandler = require('express-async-handler'); // Assuming you're using express-async-handler
const mongoose = require('mongoose'); // Assuming mongoose is installed

const Agency = require('../models/Agency'); // Assuming your Agency model is in a file named Agency.js in the models directory
const User = require('../models/User');
// Function to create a new agency
const createAgency = asyncHandler(async (req, res) => {
  const { name, address, city, state, zipCode, phoneNumber, email } = req.body;
  
  // Basic validation (can be extended further)

  if (!name || !address || !city || !state || !zipCode || !phoneNumber || !email) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  } 


  const userId = req.params.userId;

  console.log('Received user ID:', userId);

  // Validate user ID format (optional, depending on your needs)
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  // Find the user by ID
  const user = await User.findById(userId);

  // Check if user exists before proceeding
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  console.log('Found user:', user._id); 
  try {
    // Create a new agency
    const newAgency = await Agency.create({
      name,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      email
    });

    console.log('Received data 2:', req.body);

    // Check if user has the required role (e.g., "manager")
    if (user.role !== 'manager') {
      return res.status(403).json({ message: 'Unauthorized to create agency' });
    }

    if (user.agencyId) {
      return res.status(400).json({ message: 'User already manages an agency' });
    }
    
    // Associate the agency with the manager by updating their agencyId
    user.agencyId = newAgency._id;
    await user.save();
    console.log('agency id : ' , user.agencyId) ; 
    const savedData = {
      agency: newAgency,
      manager: user // Optionally include the updated user object
    };

    res.status(201).json(savedData);
  } catch (error) {
    // Handle potential Mongoose validation errors or other errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }


});


const deleteAgency = async (req, res) => {

    const { agencyId } = req.params;
  
    try {
      // Find and delete the agency
      const deletedAgency = await Agency.findByIdAndDelete(agencyId);
  
      if (!deletedAgency) {
        return res.status(404).json({ message: 'Agency not found' });
      }
  
      // Update managers with matching agency ID
      const updateResult = await User.updateMany(
        { agencyId },
        { $set: { agencyId: null, isActive: true } } // Set agencyId to null and isActive to true
      );
  
      if (updateResult.modifiedCount === 0) {
        console.warn('No users updated for deleted agency'); // Optional warning
      }
  
      res.json({ message: 'Agency deleted successfully' });
    } catch (error) {
      console.error('Error deleting agency:', error);
      res.status(500).json({ message: 'Error deleting agency' });
    }
  
  
  
};

module.exports = { createAgency , deleteAgency};
