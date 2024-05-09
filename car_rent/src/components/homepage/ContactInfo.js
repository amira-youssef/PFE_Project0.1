import React from 'react';
import Typography from '@mui/material/Typography';

const ContactInfo = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1" paragraph>
        Phone: +1 (123) 456-7890
      </Typography>
      <Typography variant="body1" paragraph>
        Email: info@example.com
      </Typography>
      <Typography variant="body1" paragraph>
        Address: 123 Street, City, Country
      </Typography>
    </div>
  );
};

export default ContactInfo;
