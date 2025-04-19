import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { username } = useParams(); // Get the username from the URL
  const location = useLocation(); // Get the state passed via navigation
  const navigate = useNavigate(); // React Router's navigation hook

  const [newUsername, setNewUsername] = useState(username); // State for editing the username
  const [newRoles, setNewRoles] = useState(location.state?.roles || []); // State for editing roles

  const handleRoleChange = (role) => {
    if (newRoles.includes(role)) {
      setNewRoles(newRoles.filter((r) => r !== role)); // Remove role if already selected
    } else {
      setNewRoles([...newRoles, role]); // Add role if not selected
    }
  };

  const handleSave = async () => {
    // Save the updated user data
    const token = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/auth/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername, roles: newRoles }),
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

  const handleResetPassword = async () => {
    // Reset the user's password to a default value
    const token = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/auth/users/${username}/reset-password`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      alert('Password reset to default successfully!');
    } catch (error) {
      console.error('Error resetting password:', error.message);
      alert('Failed to reset password.');
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
      <div className="actions">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="reset-password-button" onClick={handleResetPassword}>
          Reset Password to Default
        </button>
      </div>
    </div>
  );
};

export default EditUser;