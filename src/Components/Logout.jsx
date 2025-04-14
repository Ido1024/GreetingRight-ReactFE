import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authService';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logoutUser();
      navigate('/login');
    };

    performLogout();
  }, [navigate]);

  return null;
}

export default Logout;
