const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    maker: {
        type : String, 
        required : true ,
    }, 
    model: {
        type : String, 
        required : true ,
    }, 
    year: {
        type : Number, 
        required : true ,
    }, 
    capacity: {
        type : Number, 
        required : true ,
    }, 
    //car type : SUV , sedan 
    type: {
        type : String, 
        required : true ,
    }, 
    description: {
        type : String, 
        required : true ,
    }, 
    image: {
        type : String, 
        required : true ,
    }, 
    pricePerDay: {
        type : Number, 
        required : true ,
    }, 
    agencyId: {
        type : mongoose.Schema.Types.ObjectId, 
        required : true ,
    }, 
   
});


const Vehicle = mongoose.model('Vehicle' , vehicleSchema);

module.exports = Vehicle ; 