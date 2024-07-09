import React, { useEffect, useState } from 'react';
import './AddActivity.css';

const AddActivity = ({ onClose, onAddActivity, onUpdateActivity, onDeleteActivity, activity }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000000');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (activity) {
      setTitle(activity.title || '');
      setColor(activity.color || '#000000');
      setStartTime(activity.startTime || '');
      setEndTime(activity.endTime || '');
      setNotes(activity.notes || '');
    }
  }, [activity]);

  const handleSave = () => {
    const updatedActivity = { title, color, startTime, endTime, notes, date: activity ? activity.date : new Date() };
    console.log("Saved Activity: ", updatedActivity); // Debugging to ensure color state is included
    if (activity) {
      onUpdateActivity(activity.id, updatedActivity);
    } else {
      onAddActivity(updatedActivity);
    }
  };

  const handleDelete = () => {
    if (activity) {
      onDeleteActivity(activity.id);
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="add-activity-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{activity ? 'Edit Activity' : 'Add Activity'}</h2>
        <form>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Color:</label>
          <input type="color" value={color} onChange={handleColorChange} />
          <label>Time:</label>
          <div className="time-inputs">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <span>|</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <label>Notes:</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button type="button" onClick={handleSave}>{activity ? 'Update Activity' : 'Add Activity'}</button>
          {activity && <button type="button" className="delete-btn" onClick={handleDelete}>Delete Activity</button>}
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
