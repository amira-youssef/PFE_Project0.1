export const calculatePrice = (pickupDateTime, returnDateTime, ratePerDay) => {
    const pickupDate = new Date(pickupDateTime);
    const returnDate = new Date(returnDateTime);
    const diffTime = Math.abs(returnDate - pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * ratePerDay;
  };
  