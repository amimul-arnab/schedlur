export const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };
  
  export const createEvent = async (event) => {
    try {
      const response = await fetch('http://localhost:5001/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      const newEvent = await response.json();
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  };
  
  export const updateEvent = async (id, event) => {
    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      const updatedEvent = await response.json();
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  };
  
  export const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      return { message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Error deleting event:', error);
      return null;
    }
  };
  