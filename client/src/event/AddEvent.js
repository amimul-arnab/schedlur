import React, { useState, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = ({ onClose, event, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reminder, setReminder] = useState('15 min');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.date || '');
      setStartTime(event.startTime || '');
      setEndTime(event.endTime || '');
      setReminder(event.reminder || '15 min');
      setNotes(event.notes || '');
    }
  }, [event]);

  const handleAddEvent = () => {
    onAddEvent(title, date, startTime, endTime, reminder, notes);
  };

  return (
    <div className="modal-overlay">
      <div className="add-event-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add Event</h2>
        <form>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Date:</label>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="MM/DD/YYYY" />
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
          <button type="button" onClick={handleAddEvent}>Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
