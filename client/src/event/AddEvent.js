import React, { useEffect, useState } from 'react';
import './AddEvent.css';

const AddEvent = ({ onClose, event, onAddEvent, onDeleteEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reminder, setReminder] = useState('15 min');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.start ? event.start.split('T')[0] : ''); // Extract date part
      setStartTime(event.start ? event.start.split('T')[1].slice(0, 5) : ''); // Extract time part
      setEndTime(event.end ? event.end.split('T')[1].slice(0, 5) : ''); // Extract time part
      setReminder(event.reminder || '15 min');
      setNotes(event.notes || '');
    } else {
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setReminder('15 min');
      setNotes('');
    }
  }, [event]);

  const handleAddEvent = () => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    onAddEvent(title, formattedDate, startTime, endTime, reminder, notes);
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
