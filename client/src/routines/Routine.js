import React, { useState } from 'react';
import './Routine.css';
import AddActivity from './AddActivity';

const Routine = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [error, setError] = useState(null);

  const getFormattedDate = (date) => {
    const options = { weekday: 'long', month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${ampm}`;
  });

  const openModal = (activity = null) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
    setError(null);
  };

  const addActivity = (title, color, startTime, endTime, notes) => {
    const newActivity = { title, color, startTime, endTime, notes, date: currentDate };
    if (isOverlapping(newActivity)) {
      setError('The time slot is overlapping with an existing activity.');
      return;
    }
    setActivities([...activities, newActivity]);
    closeModal();
  };

  const updateActivity = (id, updatedActivity) => {
    if (isOverlapping(updatedActivity, id)) {
      setError('The time slot is overlapping with an existing activity.');
      return;
    }
    setActivities(activities.map((activity, index) => (index === id ? updatedActivity : activity)));
    closeModal();
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((_, index) => index !== id));
    closeModal();
  };

  const isOverlapping = (newActivity, excludeId = null) => {
    const newStart = new Date(`${currentDate.toDateString()} ${newActivity.startTime}`);
    const newEnd = new Date(`${currentDate.toDateString()} ${newActivity.endTime}`);
    
    return activities.some((activity, index) => {
      if (index === excludeId) return false;
      const existingStart = new Date(`${currentDate.toDateString()} ${activity.startTime}`);
      const existingEnd = new Date(`${currentDate.toDateString()} ${activity.endTime}`);
      return (newStart < existingEnd && newEnd > existingStart);
    });
  };

  const calculateTopPosition = (startTime) => {
    const [hour, minute] = startTime.split(':').map(Number);
    return (hour * 60 + minute) / (24 * 60) * 100; // Convert to percentage of the day
  };

  const calculateHeight = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    return ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / (24 * 60) * 100; // Convert to percentage of the day
  };

  const formatTime12Hour = (time) => {
    if (!time) return '';
    let [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const getTextColor = (bgColor) => {
    const color = bgColor.substring(1); // Remove the #
    const rgb = parseInt(color, 16); // Convert to integer
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? '#000' : '#fff'; // Light colors should have dark text, dark colors should have light text
  };

  return (
    <div className="routine-container">
      <div className="default-container">
        <div className="date-navigation">
          <button className="nav-arrow" onClick={() => changeDate(-1)}>{"<"}</button>
          <div className="date-display">
            <h2>{currentDate.toLocaleDateString('en-US', { weekday: 'long' })}</h2>
            <p>{currentDate.toLocaleDateString('en-US')}</p>
            <p>Create your daily schedule here</p>
          </div>
          <button className="nav-arrow" onClick={() => changeDate(1)}>{">"}</button>
        </div>
        <div className="time-slots">
          {hours.map((hour, index) => (
            <div key={index} className="time-slot" onClick={() => openModal(null)}>
              <div className="time">{hour}</div>
            </div>
          ))}
          <div className="activities-container">
            {activities.filter(activity => activity.date.toDateString() === currentDate.toDateString()).map((activity, idx) => {
              const topPosition = calculateTopPosition(activity.startTime);
              const height = calculateHeight(activity.startTime, activity.endTime);
              const textColor = getTextColor(activity.color);
              return (
                <div 
                  key={idx} 
                  className="activity" 
                  style={{ 
                    backgroundColor: activity.color, 
                    top: `${topPosition}%`, 
                    height: `${height}%`, 
                    color: textColor 
                  }}
                  onClick={() => openModal({ ...activity, id: idx })}
                >
                  <p className="activity-title">{activity.title}</p>
                  {height > 5 && (
                    <>
                      <p className="activity-time">{formatTime12Hour(activity.startTime)} - {formatTime12Hour(activity.endTime)}</p>
                      <p className="activity-notes">{activity.notes?.substring(0, 128)}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddActivity 
          onClose={closeModal} 
          onAddActivity={addActivity} 
          onUpdateActivity={updateActivity} 
          onDeleteActivity={deleteActivity} 
          activity={selectedActivity} 
        />
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Routine;
