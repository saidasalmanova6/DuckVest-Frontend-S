import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { DataContext } from '../DataContext/Context';

function Account() {
  let { investor } = useContext(DataContext)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    country: '',
  });

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="account-head">
        <h3>Account</h3>
        <div className="account-card">
          <div className="account-logo-name">
            <div className="account-logo">
              <img src="../src/assets/logo.png" alt="" />
            </div>
            <div className="account-detail">
              <h4>{investor.name}</h4>
              <p>{investor.email}</p>
            </div>
          </div>
          <button onClick={handleEditToggle}>
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
          <Link to={'/'}>
            <button style={{ marginLeft: '10px' }}>Log out</button>
          </Link>
        </div>
      </div>

      <div className="settings">
        <h4>Settings</h4>
        <div className="settings-card">
          <div className="setting-row">
            <h5>Email</h5>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter new email"
              />
            ) : (
              <p>{investor.email}</p>
            )}
          </div>
          <hr />

          <div className="setting-row">
            <h5>Password</h5>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            ) : (
              <p style={{ fontSize: "10px" }}>● ● ● ● ● ● ● ●</p>
            )}
          </div>
          <hr />

          <div className="setting-row">
            <h5>Phone</h5>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter new phone number"
              />
            ) : (
              <p>{investor.phone}</p>
            )}
          </div>
          <hr />

          <div className="setting-row">
            <h5>Country</h5>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            ) : (
              <p>United States</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;
