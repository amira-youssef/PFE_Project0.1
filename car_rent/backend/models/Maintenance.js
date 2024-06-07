// maintenance.js (Mongoose Model)
const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String,enum: ['assurance' , 'panne' ,'vignette' , 'other' , 'lavage']} ,
  price: {type : String ,required: true  },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
