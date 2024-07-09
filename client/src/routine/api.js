export const fetchRoutines = async () => {
  try {
    const token = localStorage.getItem('token'); // Or however you store the token
    console.log('Fetched Token:', token); // Debug log
    const response = await fetch('http://localhost:5001/api/routines', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch routines');
    }
    const routines = await response.json();
    return routines;
  } catch (error) {
    console.error('Error fetching routines:', error);
    return [];
  }
};

export const createRoutine = async (routine) => {
  try {
    const token = localStorage.getItem('token'); // Or however you store the token
    console.log('Fetched Token:', token); // Debug log
    const response = await fetch('http://localhost:5001/api/routines/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(routine),
    });
    if (!response.ok) {
      throw new Error('Failed to create routine');
    }
    const newRoutine = await response.json();
    return newRoutine;
  } catch (error) {
    console.error('Error creating routine:', error);
    return null;
  }
};

export const updateRoutine = async (id, routine) => {
  try {
    const token = localStorage.getItem('token'); // Or however you store the token
    console.log('Fetched Token:', token); // Debug log
    const response = await fetch(`http://localhost:5001/api/routines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(routine),
    });
    if (!response.ok) {
      throw new Error('Failed to update routine');
    }
    const updatedRoutine = await response.json();
    return updatedRoutine;
  } catch (error) {
    console.error('Error updating routine:', error);
    return null;
  }
};

export const deleteRoutine = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Or however you store the token
    console.log('Fetched Token:', token); // Debug log
    const response = await fetch(`http://localhost:5001/api/routines/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete routine');
    }
    return { message: 'Routine deleted successfully' };
  } catch (error) {
    console.error('Error deleting routine:', error);
    return null;
  }
};
