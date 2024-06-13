const nodemailer = require('nodemailer');
const { transporter } = require('../config');


const sendEmail=(email,subject,html)=>{

    var mail = {
      from: 'car Rental',
      to: email,
      subject,
      html
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        return err;
      } else {
        return "yeeeey";
      }
    })

}

module.exports = sendEmail;