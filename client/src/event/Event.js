import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEvent from './AddEvent';
import './Event.css';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (arg) => {
    const event = events.find(e => e.title === arg.event.title && e.date === arg.event.startStr.split('T')[0]);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = (title, date, startTime, endTime, reminder, notes) => {
    if (selectedEvent && selectedEvent.id) {
      setEvents(events.map(e => e.id === selectedEvent.id ? { ...e, title, date, startTime, endTime, reminder, notes } : e));
    } else {
      setEvents([...events, {
        id: events.length + 1,
        title,
        date,
        startTime,
        endTime,
        reminder,
        notes
      }]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="event-page">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: event.title,
          start: `${event.date}T${event.startTime}`,
          end: `${event.date}T${event.endTime}`
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
      />
      {isModalOpen && 
        <AddEvent 
          onClose={() => { setIsModalOpen(false); setSelectedEvent(null); }} 
          event={selectedEvent} 
          onAddEvent={handleAddEvent} 
        />}
    </div>
  );
};

export default Event;
