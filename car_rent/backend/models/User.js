const  mongoose  = require("mongoose") ; 

const userSchema= new mongoose.Schema({

    nom : {
        type: String , 
        required : true ,
    },
    prenom : {
        type: String , 
        required : true ,
    },
    email : {
        type: String , 
    },
    birthdate : {
        type: Date , 
        required : true ,
    },
    password: {
        type: String,
        required: true
      },
    role: {
        type: String,
        enum: ['user', 'admin' , 'manager'],
        required: true
      },
    isActive:{
        type: Boolean , 
    },  
    isAdmin: {
        type : Boolean ,
    }, 
    agence : {
        type : String , 
    },
    numTel : {
        type : String ,
    },
    buisnessEmail : {
        type : String , 
    },
    agencyId: { // New field to store agency association
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency' // Reference the Agency model for data integrity
    }, 
    address: {
        type: String , 
    },

}); 

const User = mongoose.model('User', userSchema);
 module.exports = User ; 

