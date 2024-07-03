import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useRef, useState } from 'react';
import AddEvent from './AddEvent';
import './Event.css';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from './api'; // Import API functions

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      console.log('Fetched Events:', fetchedEvents); // Debug log
      setEvents(fetchedEvents.map(event => ({
        id: event._id,
        title: event.title,
        start: `${event.date.split('T')[0]}T${event.startTime}:00`,
        end: `${event.date.split('T')[0]}T${event.endTime}:00`,
        reminder: event.reminder,
        notes: event.notes,
      })));
    };

    loadEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (arg) => {
    const event = events.find(e => e.id === arg.event.id);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = async (title, date, startTime, endTime, reminder, notes) => {
    if (selectedEvent && selectedEvent.id) {
      const updatedEvent = await updateEvent(selectedEvent.id, { title, date, startTime, endTime, reminder, notes });
      if (updatedEvent) {
        setEvents(events.map(e => e.id === selectedEvent.id ? {
          ...e,
          title: updatedEvent.title,
          start: `${updatedEvent.date.split('T')[0]}T${updatedEvent.startTime}:00`,
          end: `${updatedEvent.date.split('T')[0]}T${updatedEvent.endTime}:00`,
          reminder: updatedEvent.reminder,
          notes: updatedEvent.notes,
        } : e));
      }
    } else {
      const newEvent = { title, date, startTime, endTime, reminder, notes };
      const createdEvent = await createEvent(newEvent);
      if (createdEvent) {
        setEvents([...events, {
          id: createdEvent._id,
          title: createdEvent.title,
          start: `${createdEvent.date.split('T')[0]}T${createdEvent.startTime}:00`,
          end: `${createdEvent.date.split('T')[0]}T${createdEvent.endTime}:00`,
          reminder: createdEvent.reminder,
          notes: createdEvent.notes,
        }]);
      }
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (id) => {
    const deletedEvent = await deleteEvent(id);
    if (deletedEvent) {
      setEvents(events.filter(e => e.id !== id));
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="event-page">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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
          onDeleteEvent={handleDeleteEvent} // Pass the delete handler
        />}
    </div>
  );
};

export default Event;
