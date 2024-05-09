import React from 'react';
import Typography from '@mui/material/Typography';

const InformationSection = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Information Section
      </Typography>
      <Typography variant="body1" paragraph>
        This is where you can provide important information about your car rental service.
      </Typography>
      <Typography variant="body1" paragraph>
        You can include details such as pricing, policies, available features, and more.
      </Typography>
      <Typography variant="body1" paragraph>
        Feel free to customize this section to best suit your needs.
      </Typography>
    </div>
  );
};

export default InformationSection;
