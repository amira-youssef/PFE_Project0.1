import React, { useState } from 'react';
import axios from 'axios';
import Tag from './Tag';
import CarModal from './CarModal';
import AddMaintModal from '../MaintTab/AddMaintModal';
import CalendarModal from './CalendarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExpand, faTrash, faTools, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './style/components.css';
import 'react-datepicker/dist/react-datepicker.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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
  address,
  addTagHandler,
  hidden
}) {
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const handleExpand = () => {
    setIsCarModalOpen(true);
  };

  const handleCloseCarModal = () => {
    setIsCarModalOpen(false);
  };

  const handleOpenMaintenanceModal = () => {
    setIsMaintenanceModalOpen(true);
  };

  const handleCloseMaintenanceModal = () => {
    setIsMaintenanceModalOpen(false);
  };

  const handleOpenCalendarModal = () => {
    setIsCalendarModalOpen(true);
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarModalOpen(false);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleDelete = async () => {
    if (window.confirm('There is no going back after doing this action (this will hide the car for users), Are you sure about hiding this Car?')) {
      try {
        await axios.put(`http://localhost:5000/api/vehicles/hide/${_id}`);
        window.location.reload();
      } catch (error) {
        console.error('Error hiding vehicle:', error);
      }
    }
  };

  return (
    <div key={_id} className={`card ${hidden ? 'card--hidden' : ''}`}>
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
          {description.length > 100 && !isDescriptionExpanded ? (
            <>
              {description.substring(0, 100)}...
              <span className="read-more" onClick={toggleDescription}><strong>Read more</strong></span>
            </>
          ) : (
            <>
              {description}
              {description.length > 100 && (
                <span className="read-less" onClick={toggleDescription}><strong>Read less</strong></span>
              )}
            </>
          )}
        </div>
      </div>
      <div className='card__tags'>
        <Tag className='tag' name={type} addTagHandler={() => addTagHandler('type', type)} />
        <Tag name={year} addTagHandler={() => addTagHandler('year', year)} />
        <Tag name={boite} addTagHandler={() => addTagHandler('boite', boite)} />
        {hidden && <span className='tag tag--red'>Dismissed</span>}
      </div>
      <div className='card__icons'>
        <FontAwesomeIcon icon={faExpand} className='icon' onClick={handleExpand} />
        {!hidden && <FontAwesomeIcon icon={faTrash} className='icon' onClick={handleDelete} />}
        {!hidden && <FontAwesomeIcon icon={faTools} className='icon' onClick={handleOpenMaintenanceModal} />}
        <FontAwesomeIcon icon={faCalendarAlt} className='icon' onClick={handleOpenCalendarModal} />
      </div>
      <CarModal show={isCarModalOpen} onClose={handleCloseCarModal}>
        <div className="modal-content">
          <h2>{maker} {model}</h2>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Capacity:</strong> {capacity}</p>
          <p><strong>Boite:</strong> {boite}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Price Per Day:</strong> {pricePerDay}</p>
          <p><strong>Rents:</strong> {count}</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Address:</strong> {address}</p>
          <div className='modal-images'>
            <img src={mainImage} alt={`${maker} ${model} - 1`} />
            <img src={image2} alt={`${maker} ${model} - 1`} />
            <img src={image1} alt={`${maker} ${model} - 2`} />
            <img src={image3} alt={`${maker} ${model} - 3`} />
          </div>
        </div>
      </CarModal>
      <AddMaintModal show={isMaintenanceModalOpen} onClose={handleCloseMaintenanceModal} vehicleId={_id} />
      <CalendarModal show={isCalendarModalOpen} onClose={handleCloseCalendarModal} vehicleId={_id} />
    </div>
  );
}

export default Card;
