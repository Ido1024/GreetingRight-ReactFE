import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { username } = useParams(); // Get the username from the URL
  const location = useLocation(); // Get the state passed via navigation
  const navigate = useNavigate(); // React Router's navigation hook

  const [newUsername, setNewUsername] = useState(username); // State for editing the username
  const [newRoles, setNewRoles] = useState(location.state?.roles || []); // State for editing roles
  const [newPassword, setNewPassword] = useState(''); // State for changing the password

  const handleRoleChange = (role) => {
    if (newRoles.includes(role)) {
      setNewRoles(newRoles.filter((r) => r !== role)); // Remove role if already selected
    } else {
      setNewRoles([...newRoles, role]); // Add role if not selected
    }
  };

  const handleSave = async () => {
    // Save the updated user data, including the new password
    const token = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/auth/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername, roles: newRoles, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      alert('User updated successfully!');
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error updating user:', error.message);
      alert('Failed to update user.');
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleDeleteUser = async () => {
    // Delete the user
    const token = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/auth/users/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      alert('User deleted successfully!');
      navigate('/admin-panel'); // Navigate back to the admin panel
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="edit-user">
      <h2>Edit User</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Roles:</label>
        <div className="roles">
          {['ROLE_USER', 'ROLE_ADMIN'].map((role) => (
            <label key={role} className="role-checkbox">
              <input
                type="checkbox"
                checked={newRoles.includes(role)}
                onChange={() => handleRoleChange(role)}
              />
              {role}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
      <div className="actions">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <button className="delete-user-button" onClick={handleDeleteUser}>
        Delete User
      </button>
    </div>
  );
};

export default EditUser;