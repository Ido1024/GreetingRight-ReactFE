import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [error, setError] = useState(null); // State to store errors
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('accessToken'); // Retrieve the token
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await fetch('http://localhost:8080/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data); // Update the state with the fetched data
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message); // Update the error state
      }
    };

    fetchUsers();
  }, []); // Only runs when the component is mounted

  const handleEditClick = (user) => {
    // Navigate to the EditUser page with the username and roles as state
    navigate(`/edit-user/${user.username}`, { state: { roles: user.roles } });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Welcome to the admin panel! Here you can view and edit user information.</p>

      {error && <p className="error-message">Error: {error}</p>}

      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Creation Date</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{new Date(user.creationDate).toLocaleDateString()}</td>
                <td>{user.roles.join(', ')}</td>
                <td>
                  <button
                    className="edit-user-button"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-users-message">No users found.</p>
      )}
    </div>
  );
};

export default AdminPanel;