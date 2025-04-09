import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');

      try {
        // Send logout request to backend
        await fetch('http://localhost:8080/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (err) {
        console.error("Logout request failed:", err);
      }

      // Clear tokens from sessionStorage regardless of BE response
      sessionStorage.clear();
      navigate('/login');
    };

    logoutUser();
  }, [navigate]);

  return null; // Render nothing while logging out
}

export default Logout;
