const API_BASE_URL = 'http://localhost:8080/api/auth'; // Spring Boot backend base URL

/**
 * Generate a new wish by sending a request to the Spring Boot backend.
 * @param {string} text - The user's input for generating a wish.
 * @returns {Promise<string>} - The generated wish.
 */
export const generateWish = async (text) => {
  const token = sessionStorage.getItem('accessToken'); // Retrieve the token from sessionStorage

  try {
    const response = await fetch(`${API_BASE_URL}/wish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
      body: JSON.stringify({ text }), // Only send the text
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error('An unexpected error occurred.');
      }
      throw new Error(errorData.error || 'Internal error');
    }

    const data = await response.json();
    return data.wish; // Extract the "wish" property from the response
  } catch (error) {
    console.error('Error generating wish:', error.message);
    throw error;
  }
};

/**
 * Fetch the recent 3 wishes for the authenticated user.
 * @returns {Promise<Array>} - The recent 3 wishes.
 */
export const fetchRecentWishes = async () => {
  const token = sessionStorage.getItem('accessToken'); // Retrieve the token from sessionStorage

  try {
    const response = await fetch(`${API_BASE_URL}/wishes/recent`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error('An unexpected error occurred.');
      }
      throw new Error(errorData.error || 'Internal error');
    }

    const data = await response.json();
    return data; // Return the list of recent wishes
  } catch (error) {
    console.error('Error fetching recent wishes:', error.message);
    throw error;
  }
};

/**
 * Fetch the favorite wishes for the authenticated user.
 * @returns {Promise<Array>} - The favorite wishes.
 */
export const fetchFavoriteWishes = async () => {
  const token = sessionStorage.getItem('accessToken'); // Retrieve the token from sessionStorage

  try {
    const response = await fetch(`${API_BASE_URL}/wishes/favorites`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error('An unexpected error occurred.');
      }
      throw new Error(errorData.error || 'Internal error');
    }

    const data = await response.json();
    return data; // Return the list of favorite wishes
  } catch (error) {
    console.error('Error fetching favorite wishes:', error.message);
    throw error;
  }
};

/**
 * Toggle the favorite status of a wish.
 * @param {number} wishId - The ID of the wish to toggle.
 * @returns {Promise<string>} - A success message.
 */
export const toggleFavoriteStatus = async (wishId) => {
  const token = sessionStorage.getItem('accessToken'); // Retrieve the token from sessionStorage

  try {
    const response = await fetch(`${API_BASE_URL}/wishes/${wishId}/favorite`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error('An unexpected error occurred.');
      }
      throw new Error(errorData.error || 'Internal error');
    }

    const data = await response.text(); // The backend returns a success message as plain text
    return data; // Return the success message
  } catch (error) {
    console.error('Error toggling favorite status:', error.message);
    throw error;
  }
};
