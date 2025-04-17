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
