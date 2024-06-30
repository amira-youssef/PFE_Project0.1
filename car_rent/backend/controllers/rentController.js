const Rent = require('../models/Rent'); 
const Vehicle = require('../models/Vehicle'); 
const mongoose = require('mongoose');
const sendEmail = require('../services/emailService');




const calculateTotalRentPrice = async () => {
  try {
    const now = new Date();
    const acceptedRents = await Rent.find({
      status: 'accepted',
      returnDateTime: { $lt: now }
    });

    const totalRentPrice = acceptedRents.reduce((total, rent) => total + rent.price, 0);

    return totalRentPrice;
  } catch (error) {
    console.error('Error calculating total rent price:', error);
    throw error;
  }
};

const getTotalAcceptedRentPrice = async (req, res) => {
  try {
    const { agencyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(agencyId)) {
      return res.status(400).json({ message: 'Invalid agency ID' });
    }

    const vehicles = await Vehicle.find({ agencyId });
    const vehicleIds = vehicles.map(vehicle => vehicle._id);

    const totalRentPrice = await Rent.aggregate([
      { $match: { vehicleId: { $in: vehicleIds }, status: 'accepted', returnDateTime: { $lt: new Date() } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    res.status(200).json({ totalRentPrice: totalRentPrice[0]?.total || 0 });
  } catch (error) {
    console.error('Error calculating total rent price:', error);
    res.status(500).json({ message: 'Error calculating total rent price', error: error.message });
  }
};


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

    if (!mongoose.Types.ObjectId.isValid(agencyId)) {
      return res.status(400).json({ message: 'Invalid agencyId' });
    }

    const vehicles = await Vehicle.find({ agencyId });

    const vehicleIds = vehicles.map(vehicle => vehicle._id);

    const rents = await Rent.find({ vehicleId: { $in: vehicleIds } });

    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRentsByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicleId' });
    }

    const rents = await Rent.find({ vehicleId });

    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





const getRentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const rents = await Rent.find({ userId }).populate('vehicleId', 'maker model mainImage');

    if (!rents.length) {
      return res.status(404).json({ message: 'No rent records found for this user.' });
    }

    const transformedRents = rents.map(rent => ({
      _id: rent._id,
      vehicleId: rent.vehicleId ? rent.vehicleId._id : null,
      userId: rent.userId,
      pickupDateTime: rent.pickupDateTime,
      returnDateTime: rent.returnDateTime,
      status: rent.status,
      hidden: rent.hidden,
      maker: rent.vehicleId ? rent.vehicleId.maker : 'N/A',
      model: rent.vehicleId ? rent.vehicleId.model : 'N/A',
      mainImage: rent.vehicleId ? rent.vehicleId.mainImage : 'placeholder.jpg', 
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

    const rent = await Rent.findById(id);

    if (!rent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    if (rent.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending rents can be deleted' });
    }

    await Rent.findByIdAndDelete(id);

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
    const rents = await Rent.find({
      vehicleId,
      status: { $in: ['accepted', 'pending'] }
    }).select('pickupDateTime returnDateTime status');
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






const aggregateRents = async (groupBy) => {
  return await Rent.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: groupBy, date: "$pickupDateTime" }
        },
        totalAmount: { $sum: "$price" },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
};

const getDailyRents = async (req, res) => {
  try {
    const rents = await aggregateRents("%Y-%m-%d");
    res.json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWeeklyRents = async (req, res) => {
  try {
    const rents = await aggregateRents("%Y-%U");
    res.json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyRents = async (req, res) => {
  try {
    const rents = await aggregateRents("%Y-%m");
    res.json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSemesterRents = async (req, res) => {
  try {
    const rents = await Rent.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $lte: [{ $month: "$pickupDateTime" }, 6] },
              { $concat: [{ $year: "$pickupDateTime" }, "-S1"] },
              { $concat: [{ $year: "$pickupDateTime" }, "-S2"] }
            ]
          },
          totalAmount: { $sum: "$price" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    res.json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const getRevenueByInterval = async (req, res) => {
  const { interval, agencyId } = req.params;
  const intervals = {
    daily: '$dayOfMonth',
    weekly: '$week',
    monthly: '$month',
    yearly: '$year'
  };

  try {
    const vehicles = await Vehicle.find({ agencyId });
    const vehicleIds = vehicles.map(vehicle => vehicle._id);

    const rents = await Rent.aggregate([
      { $match: { vehicleId: { $in: vehicleIds }, status: 'accepted' } },
      {
        $group: {
          _id: { [intervals[interval]]: '$pickupDateTime' },
          totalAmount: { $sum: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(rents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getNumberOfRentsByAgencyId = async (req, res) => {
  const { agencyId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(agencyId)) {
    return res.status(400).json({ message: 'Invalid agency ID' });
  }

  try {
    // Find all vehicles by agencyId
    const vehicles = await Vehicle.find({ agencyId });

    // Extract vehicleIds
    const vehicleIds = vehicles.map(vehicle => vehicle._id);

    // Count all rents with those vehicleIds and hidden: false
    const count = await Rent.countDocuments({ vehicleId: { $in: vehicleIds }, hidden: false });

    res.json({ count });
  } catch (error) {
    console.error('Error fetching number of rents:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createRent,
  getRentsByAgencyId,
  getRentsByVehicleId,
  getRentsByUserId,
  updateRentStatus,
  deleteRent,
  getRentDatesByVehicleId,
  getTotalAcceptedRentPrice,
  getDailyRents,
  getWeeklyRents,
  getMonthlyRents,
  getSemesterRents,
  getRevenueByInterval,
  getNumberOfRentsByAgencyId
};
