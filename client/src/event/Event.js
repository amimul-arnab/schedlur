import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useRef, useState } from 'react';
import AddEvent from './AddEvent';
import './Event.css';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from './api'; // Import API functions

const Event = ({ userId }) => { // Add userId as a prop
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [defaultDate, setDefaultDate] = useState('');
  const [defaultStartTime, setDefaultStartTime] = useState('');
  const [defaultEndTime, setDefaultEndTime] = useState('');
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
      // Set reminders for fetched events
      fetchedEvents.forEach(event => {
        setReminderNotification(event);
      });
    };

    loadEvents();
  }, []);

  const setReminderNotification = (event) => {
    const reminderTime = new Date(event.reminder).getTime();
    const now = new Date().getTime();
    const delay = reminderTime - now;

    if (delay > 0) {
      setTimeout(() => {
        alert(`Reminder: ${event.title} is starting soon!`);
      }, delay);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr });
    setDefaultDate(arg.dateStr); // Set the default date

    // Calculate current time and 15 minutes later
    const now = new Date();
    const startTime = now.toTimeString().slice(0, 5); // HH:MM format
    now.setMinutes(now.getMinutes() + 15);
    const endTime = now.toTimeString().slice(0, 5); // HH:MM format

    setDefaultStartTime(startTime);
    setDefaultEndTime(endTime);
    setIsModalOpen(true);
  };

  const handleEventClick = (arg) => {
    const event = events.find(e => e.id === arg.event.id);
    setSelectedEvent(event);
    setDefaultDate(event.start.split('T')[0]); // Set the default date to the event's start date
    setDefaultStartTime(event.start.split('T')[1].slice(0, 5)); // Set the default start time
    setDefaultEndTime(event.end.split('T')[1].slice(0, 5)); // Set the default end time
    setIsModalOpen(true);
  };

  const handleAddEvent = async (userId, title, date, startTime, endTime, reminder, notes) => {
    if (selectedEvent && selectedEvent.id) {
      const updatedEvent = await updateEvent(selectedEvent.id, { user_id: userId, title, date, startTime, endTime, reminder, notes });
      if (updatedEvent) {
        setEvents(events.map(e => e.id === selectedEvent.id ? {
          ...e,
          title: updatedEvent.title,
          start: `${updatedEvent.date.split('T')[0]}T${updatedEvent.startTime}:00`,
          end: `${updatedEvent.date.split('T')[0]}T${updatedEvent.endTime}:00`,
          reminder: updatedEvent.reminder,
          notes: updatedEvent.notes,
        } : e));
        setReminderNotification(updatedEvent);
      }
    } else {
      const newEvent = { user_id: userId, title, date, startTime, endTime, reminder, notes };
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
        setReminderNotification(createdEvent);
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
          userId={userId} // Pass userId to AddEvent component
          defaultDate={defaultDate} // Pass default date to AddEvent component
          defaultStartTime={defaultStartTime} // Pass default start time to AddEvent component
          defaultEndTime={defaultEndTime} // Pass default end time to AddEvent component
        />}
    </div>
  );
};

export default Event;
