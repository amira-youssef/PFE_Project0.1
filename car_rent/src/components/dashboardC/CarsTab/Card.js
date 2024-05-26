import React, { useState } from 'react';
import Tag from './Tag';
import CarModal from './CarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExpand, faTrash } from '@fortawesome/free-solid-svg-icons';
import './style/components.css';
import 'react-datepicker/dist/react-datepicker.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';

function Card({
  _id,
  maker,
  model,
  boite,
  year,
  capacity,
  type,
  description,
  mainImage,
  image1,
  image2,
  image3,
  pricePerDay,
  count,
  addTagHandler,
  unavailableDates
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailableDate => 
      format(unavailableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div key={_id} className='card'>
      <div className='card__logo'>
        <img src={mainImage} alt={`${maker} ${model}`} />
      </div>
      <div className='card__data'>
        <div className='card__heading'>
          <div className='card__name'>{maker} {model}</div>
          <div className='card__meta'>
            <span>{year}</span>
            <span>{capacity}</span>
            <span>{boite}</span>
          </div>
        </div>
        <div className='card__description'>
          {description}
        </div>
      </div>
      <div className='card__tags'>
        <Tag name={type} addTagHandler={() => addTagHandler('type', type)} />
        <Tag name={year} addTagHandler={() => addTagHandler('year', year)} />
        <Tag name={boite} addTagHandler={() => addTagHandler('boite', boite)} />
      </div>
      <div className='card__icons'>
        <FontAwesomeIcon icon={faEdit} className='icon' />
        <FontAwesomeIcon icon={faExpand} className='icon' onClick={handleExpand} />
        <FontAwesomeIcon icon={faTrash} className='icon' />
      </div>

      {/* Modal component for the popup */}
      <CarModal show={isModalOpen} onClose={handleCloseModal}>
        <h2>{maker} {model}</h2>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Capacity:</strong> {capacity}</p>
        <p><strong>Boite:</strong> {boite}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Price Per Day:</strong> {pricePerDay}</p>
        <p><strong>Count:</strong> {count}</p>
        {/* Include any other details or images */}
        <div className='modal-images'>
          <img src={image1} alt={`${maker} ${model} - 1`} />
          <img src={image2} alt={`${maker} ${model} - 2`} />
          <img src={image3} alt={`${maker} ${model} - 3`} />
        </div>
        <div className='modal-calendar'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar 
              shouldDisableDate={isDateUnavailable} 
            />
          </LocalizationProvider>
        </div>
      </CarModal>
    </div>
  );
}

export default Card;
