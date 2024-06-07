import React, { useState } from 'react';
import Tag from '../CarsTab/Tag';
import MaintUpdate from './MaintUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExpand } from '@fortawesome/free-solid-svg-icons';
import '../CarsTab/style/components.css';
import axios from 'axios';

function MaintenanceCard({
  _id,
  vehicleId,
  managerId,
  startDate,
  endDate,
  type,
  price,
  mainImage,
  addTagHandler,
  onMaintenanceUpdate,
  onDelete,
  hidden
}) {
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const handleOpenMaintenanceModal = () => {
    setIsMaintenanceModalOpen(true);
  };

  const handleCloseMaintenanceModal = () => {
    setIsMaintenanceModalOpen(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure about hiding this maintenance?')) {
      try {
        await axios.put(`http://localhost:5000/api/maint/update/${_id}`, { hidden: true });
        onDelete(_id);
      } catch (error) {
        console.error('Error hiding maintenance:', error);
      }
    }
  };

  const maintenance = {
    _id,
    vehicleId,
    managerId,
    startDate,
    endDate,
    type,
    price,
    mainImage
  };

  const isFutureDate = new Date(startDate) > new Date();

  return (
    <div key={_id} className={`card ${hidden ? 'card--hidden' : ''}`}>
      <div className='card__logo'>
        <img src={mainImage} alt={`${type} maintenance`} />
      </div>
      <div className='card__data'>
        <div className='card__heading'>
          <div className='card__name'>Maintenance</div>
          <div className='card__meta'>
            <span>{type}</span>
            <span>{price}</span>
          </div>
        </div>
        <div className='card__description'>
          <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(endDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='card__tags'>
        <Tag className='tag' name={type} addTagHandler={() => addTagHandler('type', type)} />
        {hidden && <span className='tag tag--red'>{isFutureDate ? 'Suspended' : 'Dismissed'}</span>}
      </div>
      <div className='card__icons'>
        {!hidden && <FontAwesomeIcon icon={faEdit} className='icon' onClick={handleOpenMaintenanceModal} />}
        {!hidden && <FontAwesomeIcon icon={faTrash} className='icon' onClick={handleDelete} />}
      </div>
      <MaintUpdate show={isMaintenanceModalOpen} onClose={handleCloseMaintenanceModal} maintenance={maintenance} />
    </div>
  );
}

export default MaintenanceCard;
