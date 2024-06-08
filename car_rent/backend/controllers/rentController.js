const Rent = require('../models/Rent'); // Adjust the path as necessary
const Vehicle = require('../models/Vehicle'); // Adjust the path as necessary
const mongoose = require('mongoose');
const sendEmail = require('../services/emailService')


const createRent = async (req, res) => {
  try {
    const { userId, vehicleId } = req.params;
    const rentData = req.body;
    console.log("user :",userId);
    console.log("vehicle :",vehicleId);
    console.log("Received rentData:", rentData);

    // Validate userId and vehicleId
    //if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
     // return res.status(400).json({ message: 'Invalid userId or vehicleId' });
    //}
    //console.log("first error " , res);

    // Validate dates
    const { pickupDateTime, returnDateTime } = rentData;
    const now = new Date();
   // if (new Date(pickupDateTime) <= now || new Date(returnDateTime) <= now) {
     // return res.status(400).json({ message: 'Pickup and return dates must be in the future' });
    //}    console.log("2 error " , res);


    //if (new Date(pickupDateTime) >= new Date(returnDateTime)) {
    //  return res.status(400).json({ message: 'Pickup date must be before return date' });
    //}
    //console.log("3 error " , res);

    // Create new rent entry
    const newRent = new Rent({
      userId,
      vehicleId,
      ...rentData,
      status: 'pending',
    });
    
    console.log("New Rent Entry:", newRent);

   
    await newRent.save();

    // Increment vehicle count
    await Vehicle.findByIdAndUpdate(vehicleId, { $inc: { count: 1 } });

    res.status(201).json(newRent);
  } catch (error) {
    console.error('Error creating rent:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all rents by agencyId
const getRentsByAgencyId = async (req, res) => {
  try {
    const { agencyId } = req.params;

    // Validate agencyId
    if (!mongoose.Types.ObjectId.isValid(agencyId)) {
      return res.status(400).json({ message: 'Invalid agencyId' });
    }

    // Find all vehicles by agencyId
    const vehicles = await Vehicle.find({ agencyId });

    // Extract vehicleIds
    const vehicleIds = vehicles.map(vehicle => vehicle._id);

    // Find all rents with those vehicleIds
    const rents = await Rent.find({ vehicleId: { $in: vehicleIds } });

    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rents by vehicleId
const getRentsByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    // Validate vehicleId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicleId' });
    }

    // Find all rents by vehicleId
    const rents = await Rent.find({ vehicleId });

    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rents by userId
const getRentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Fetch rents by user ID and populate vehicle details
    const rents = await Rent.find({ userId }).populate('vehicleId', 'maker model mainImage');

    if (!rents.length) {
      return res.status(404).json({ message: 'No rent records found for this user.' });
    }

    // Transform data to include maker, model, and mainImage from vehicle
    const transformedRents = rents.map(rent => ({
      _id: rent._id,
      vehicleId: rent.vehicleId._id,
      userId: rent.userId,
      pickupDateTime: rent.pickupDateTime,
      returnDateTime: rent.returnDateTime,
      status: rent.status,
      hidden: rent.hidden,
      maker:  rent.vehicleId.maker ,
      model:  rent.vehicleId.model ,
      mainImage:  rent.vehicleId.mainImage ,
    }));

    return res.status(200).json(transformedRents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



const updateRentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate rent id and status
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid rent id' });
    }

    if (!['accepted', 'pending', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedRent = await Rent.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    // Send email based on status
    if (status === 'accepted') {
      const emailMessage = 'Your rent request has been accepted. ';
      const emailSubject = 'Rent Request Accepted';
      const testEmail = await sendEmail(updatedRent.driverInformation.email, emailSubject, emailMessage);
      console.log('Acceptance email sent:', testEmail);
    } else if (status === 'rejected') {
      const emailMessage = 'Your rent request has been rejected. ';
      const emailSubject = 'Rent Request Rejected';
      const testEmail = await sendEmail(updatedRent.driverInformation.email, emailSubject, emailMessage);
      console.log('Rejection email sent:', testEmail);
    }

    res.status(200).json(updatedRent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteRent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the rent ID
   // if (!mongoose.Types.ObjectId.isValid(id)) {
     // return res.status(400).json({ message: 'Invalid rent ID' });
    //}

    // Find and delete the rent by ID
    const deletedRent = await Rent.findByIdAndDelete(id);
    console.log(id);
    if (!deletedRent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    res.status(200).json({ message: 'Rent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRentDatesByVehicleId = async (req, res) => {
  const { vehicleId } = req.params;
  console.log("Received vehicle ID:", vehicleId); // Log the received vehicle ID

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ message: 'Invalid vehicle ID format' });
  }

  try {
    const rents = await Rent.find({ vehicleId }).select('pickupDateTime returnDateTime status');
    console.log("Fetched rents:", rents);

    const formattedRents = rents.map(rent => ({
      startDate: rent.pickupDateTime,
      endDate: rent.returnDateTime,
      status: rent.status
    }));

    return res.status(200).json(formattedRents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createRent,
  getRentsByAgencyId,
  getRentsByVehicleId,
  getRentsByUserId,
  updateRentStatus,
  deleteRent,
  getRentDatesByVehicleId
};
