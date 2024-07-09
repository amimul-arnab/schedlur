import React, { useEffect, useState } from 'react';
import './AddEvent.css';

const AddEvent = ({ onClose, event, onAddEvent, onDeleteEvent, userId, defaultDate, defaultStartTime, defaultEndTime }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDate || '');
  const [startTime, setStartTime] = useState(defaultStartTime || '');
  const [endTime, setEndTime] = useState(defaultEndTime || '');
  const [reminder, setReminder] = useState('15 min');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.start ? event.start.split('T')[0] : defaultDate || ''); // Extract date part
      setStartTime(event.start ? event.start.split('T')[1].slice(0, 5) : defaultStartTime || ''); // Extract time part
      setEndTime(event.end ? event.end.split('T')[1].slice(0, 5) : defaultEndTime || ''); // Extract time part
      setReminder(event.reminder || '15 min');
      setNotes(event.notes || '');
    } else {
      setTitle('');
      setDate(defaultDate || '');
      setStartTime(defaultStartTime || '');
      setEndTime(defaultEndTime || '');
      setReminder('15 min');
      setNotes('');
    }
  }, [event, defaultDate, defaultStartTime, defaultEndTime]);

  const handleAddEvent = () => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const startDateTime = new Date(`${formattedDate}T${startTime}`);
    
    // Calculate reminder time
    let reminderTime = new Date(startDateTime);
    switch (reminder) {
      case '15 min':
        reminderTime.setMinutes(startDateTime.getMinutes() - 15);
        break;
      case '30 min':
        reminderTime.setMinutes(startDateTime.getMinutes() - 30);
        break;
      case '1 hour':
        reminderTime.setHours(startDateTime.getHours() - 1);
        break;
      case '2 hours':
        reminderTime.setHours(startDateTime.getHours() - 2);
        break;
      case '4 hours':
        reminderTime.setHours(startDateTime.getHours() - 4);
        break;
      default:
        break;
    }

    onAddEvent(userId, title, formattedDate, startTime, endTime, reminderTime.toISOString(), notes);
  };

  const handleDeleteEvent = () => {
    if (event && event.id) {
      onDeleteEvent(event.id);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-event-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{event && event.id ? 'Edit Event' : 'Add Event'}</h2>
        <form>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label>Time:</label>
          <div className="time-inputs">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <span>|</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <label>Set Reminder:</label>
          <select value={reminder} onChange={(e) => setReminder(e.target.value)}>
            <option value="15 min">15 min</option>
            <option value="30 min">30 min</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="4 hours">4 hours</option>
          </select>
          <label>Notes:</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button type="button" onClick={handleAddEvent}>{event && event.id ? 'Update Event' : 'Add Event'}</button>
          {event && event.id && (
            <button type="button" className="delete-btn" onClick={handleDeleteEvent}>Delete Event</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
