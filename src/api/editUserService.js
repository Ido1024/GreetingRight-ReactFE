const API_BASE_URL = 'http://localhost:8080/api/auth/users';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const updateUser = async (username, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${username}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${username}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};