const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    vehicleId: {
        type : mongoose.Schema.Types.ObjectId, 
        required : true ,
    }, 
    //userId: {
      //  type : mongoose.Schema.Types.ObjectId, 
       // required : true ,
    //}, 
    agencyId: {
        type : mongoose.Schema.Types.ObjectId, 
        required : true ,
    }, 
    startDate: {
        type : Date, 
        required : true ,
    }, 
    endDate: {
        type : Date, 
        required : true ,
    }, 
    pricePerPeriod: {
        type : String, 
        required : true ,
    }, 
    
   
});


const Reservation = mongoose.model('Reservation' , reservationSchema);

module.exports = Reservation ; 