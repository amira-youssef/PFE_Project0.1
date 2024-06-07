import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import './style/modal.css';

const localizer = momentLocalizer(moment);

const CalendarModal = ({ show, onClose, vehicleId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("Fetching events for vehicle ID:", vehicleId);
      try {
        const rentsResponse = await axios.get(`http://localhost:5000/api/rents/getRentDates/${vehicleId}`);
        console.log("Rents response:", rentsResponse.data);
        
        const maintenancesResponse = await axios.get(`http://localhost:5000/api/maint/getMaintDatesByVehicleId/${vehicleId}`);
        console.log("Maintenances response:", maintenancesResponse.data);

        const rents = rentsResponse.data.map(rent => ({
          title: 'Rent',
          start: rent.startDate,
          end: rent.endDate,
          allDay: true,
        }));

        const maintenances = maintenancesResponse.data.map(maintenance => ({
          title: maintenance.maintenanceType,
          start: new Date(maintenance.startDate),
          end: new Date(maintenance.endDate),
          allDay: true,
        }));

        setEvents([...rents, ...maintenances]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (show) {
      fetchEvents();
    }
  }, [show, vehicleId]);

  if (!show) return null;

  return (
    <Modal open={show} onClose={onClose} className="modal-overlay">
      <div className="modal">
        <h2>Vehicle Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </Modal>
  );
};

export default CalendarModal;
