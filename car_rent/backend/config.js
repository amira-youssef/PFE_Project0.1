
const nodemailer = require('nodemailer');
const creds = {
  USER: 'youssefamira964@gmail.com',
  PASS: 'mibx mgan nekt xcvl'
}

//Email config
var transport = {
    host: 'smtp.gmail.com', 
    port: 465 ,
    service: 'Gmail',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('All works fine, congratz!');
    }
  });
  
module.exports = {
  transporter,
  user: creds.USER
}