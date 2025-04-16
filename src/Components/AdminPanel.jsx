import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('accessToken'); // Retrieve the token from sessionStorage
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await fetch('http://localhost:8080/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch users');
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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Panel</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>Welcome to the admin panel!</p>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

      {users.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Creation Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.username}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(user.creationDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.roles.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#555' }}>No users found.</p>
      )}
    </div>
  );
};

export default AdminPanel;