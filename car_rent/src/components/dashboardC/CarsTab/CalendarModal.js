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
          start: new Date(rent.startDate),
          end: new Date(rent.endDate),
          allDay: true,
          type: 'rent',
          status: rent.status
        }));

        const maintenances = maintenancesResponse.data.map(maintenance => ({
          title: maintenance.maintenanceType,
          start: new Date(maintenance.startDate),
          end: new Date(maintenance.endDate),
          allDay: true,
          type: 'maintenance',
          hidden: maintenance.hidden
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

  const eventPropGetter = (event) => {
    let backgroundColor;
    if (event.type === 'rent') {
      if (event.status === 'accepted') {
        backgroundColor = 'green';
      } else if (event.status === 'pending') {
        backgroundColor = 'yellow';
      } else if (event.status === 'discarded' || event.status === 'suspended') {
        backgroundColor = 'red';
      }
    } else if (event.type === 'maintenance') {
      backgroundColor = event.hidden ? 'red' : 'blue';
    }

    return { style: { backgroundColor } };
  };

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
          eventPropGetter={eventPropGetter}
        />
      </div>
    </Modal>
  );
};

export default CalendarModal;
