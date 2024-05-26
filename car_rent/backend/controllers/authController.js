const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, birthdate , address } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
 
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user with the hashed password
    const newUser = new User({
      nom: nom,
      prenom: prenom,
      email: email,
      password: hashedPassword,
      birthdate: birthdate,
      address: address , 
      role: 'user',
      isActive: true // Set isActive to true for users
    });

    await newUser.save();
    console.log("User added successfully !!!");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Basic validation (optional)
    if (!email || !password) {
      console.error('Missing email or password in login request');
      return res.status(400).json({ message: 'Please provide email and password' });
    }
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.error('Invalid email or password');
        return res.status(401).json({ message: 'Invalid email or password' }); // Unauthorized
      }
  
      // Check if account is inactive
      if (!user.isActive) {
        return res.status(403).json({ message: 'Your account is still inactive. Please wait for approval.' }); // Forbidden
      }
  
      // Compare password hashes (use bcrypt.compare)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error('Invalid password');
        return res.status(401).json({ message: 'Invalid email or password' }); // Unauthorized
      }
  
      const jwtSecret = process.env.JWT_SECRET;

  
      // Assuming you have a variable `userId` containing the user's ID
      const token = jwt.sign({ _id: user._id }, jwtSecret , { expiresIn: '30m' }); // Replace '30m' with your desired expiration time
  
      console.log(`User ${user.email} logged in successfully`);
      res.json({ token, user: { ...user._doc, password: undefined, role: user.role } });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };




  const registerAgencyManager = async (req , res) => {
    try {
        const {nom , prenom , email , password , birthdate , agence , numTel, buisnessEmail } = req.body ; 
    // Check for existing user with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });    }
  
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new User({
      nom: nom,
      prenom: prenom,
      email: email,
      password: hashedPassword, // Hash password before saving
      birthdate: birthdate, // Set isActive to false for managers
      agence: agence,
      numTel: numTel,
      buisnessEmail: buisnessEmail,
      role: 'manager',
      isActive: false, 
    });
    await newManager.save();
    console.log("Manager addded successfully !!!");
    res.status(201).json({ message: 'Manager registered successfully' });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
  

module.exports = {login , registerUser , registerAgencyManager};