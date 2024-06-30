import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import axios from 'axios';

export default function Deposits() {
  const [totalRentPrice, setTotalRentPrice] = React.useState(0);
  const [totalMaintenancePrice, setTotalMaintenancePrice] = React.useState(0);

  React.useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    let isMounted = true;

    if (userData && userData.agencyId) {
      const fetchPrices = async () => {
        try {
          const rentResponse = await axios.get(`http://localhost:5000/api/rents/totalAcceptedRentPrice/${userData.agencyId}`);
          const maintenanceResponse = await axios.get(`http://localhost:5000/api/maint/totalPastMaintenancePrice/${userData.agencyId}`);

          if (isMounted) {
            setTotalRentPrice(rentResponse.data.totalRentPrice);
            setTotalMaintenancePrice(maintenanceResponse.data.totalMaintenancePrice);
          }
        } catch (error) {
          if (isMounted) {
            console.error('Error fetching prices:', error);
          }
        }
      };

      fetchPrices();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getEmoticon = () => {
    if (totalMaintenancePrice > totalRentPrice) {
      return <SentimentVeryDissatisfiedIcon style={{ color: 'red', fontSize: '2rem' }} />;
    } else if (totalMaintenancePrice === totalRentPrice) {
      return <SentimentNeutralIcon style={{ color: 'yellow', fontSize: '2rem' }} />;
    } else {
      return <SentimentSatisfiedIcon style={{ color: 'green', fontSize: '2rem' }} />;
    }
  };

  return (
    <React.Fragment>
      {getEmoticon()}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography component="p" variant="h4" style={{ color: 'green' }}>
            +{totalRentPrice} Dt <ArrowUpwardIcon style={{ color: 'green' }} />
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Income
          </Typography>
        </Box>
      </Box>
    
    </React.Fragment>
  );
}
