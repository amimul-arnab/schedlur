import React, { useEffect, useState } from 'react';
import AddActivity from './AddActivity';
import { createRoutine, deleteRoutine, fetchRoutines, updateRoutine } from './api';
import './Routine.css';

const Routine = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      const fetchedActivities = await fetchRoutines();
      setActivities(fetchedActivities.map(activity => ({
        ...activity,
        date: new Date(activity.date),
        color: activity.color || '#000000' // Ensure a default color value
      })));
    };
    loadActivities();
  }, []);

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

  const addActivity = async (newActivity) => {
    const activityWithDate = { ...newActivity, date: currentDate };
    console.log("Adding Activity: ", activityWithDate); // Debugging to ensure color state is included
    if (isOverlapping(activityWithDate)) {
      setError('The time slot is overlapping with an existing activity.');
      return;
    }
    const createdActivity = await createRoutine(activityWithDate);
    setActivities([...activities, { ...createdActivity, date: new Date(createdActivity.date) }]);
    closeModal();
  };

  const updateActivity = async (id, updatedActivity) => {
    const activityWithDate = { ...updatedActivity, date: selectedActivity ? selectedActivity.date : new Date() };
    console.log("Updating Activity: ", activityWithDate); // Debugging to ensure color state is included
    if (isOverlapping(activityWithDate, id)) {
      setError('The time slot is overlapping with an existing activity.');
      return;
    }
    const newActivity = await updateRoutine(id, activityWithDate);
    setActivities(activities.map(activity => (activity._id === id ? { ...newActivity, date: new Date(newActivity.date) } : activity)));
    closeModal();
  };

  const deleteActivity = async (id) => {
    await deleteRoutine(id);
    setActivities(activities.filter(activity => activity._id !== id));
    closeModal();
  };

  const isOverlapping = (newActivity, excludeId = null) => {
    const newStart = new Date(`${currentDate.toDateString()} ${newActivity.startTime}`);
    const newEnd = new Date(`${currentDate.toDateString()} ${newActivity.endTime}`);
    
    return activities.some((activity, index) => {
      if (index === excludeId) return false;
      const existingStart = new Date(`${activity.date.toDateString()} ${activity.startTime}`);
      const existingEnd = new Date(`${activity.date.toDateString()} ${activity.endTime}`);
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
                  onClick={() => openModal({ ...activity, id: activity._id })}
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
