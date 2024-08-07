import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css'; // Make sure to create this CSS file

const PersonForm = ({ person, onSave, onCancel }) => {
  const [form, setForm] = useState(person || { name: '', email: '', mobileNo: '', dob: '' });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false); // Add this state

  useEffect(() => {
    setForm(person || { name: '', email: '', mobileNo: '', dob: '' });
    setErrors({});
    setIsVisible(true); // Show the form when `person` changes
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z\s]{2,}$/;
    return namePattern.test(name);
  };

  const validateMobileNo = (mobileNo) => {
    const mobileNoPattern = /^[789]\d{9}$/; // Starts with 7, 8, or 9, followed by 9 more digits
    return mobileNoPattern.test(mobileNo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!form.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!validateName(form.name)) {
      newErrors.name = 'Name must contain at least 2 alphabetic characters';
      isValid = false;
    }

    // Mobile number validation
    if (!form.mobileNo) {
      newErrors.mobileNo = 'Mobile number is required';
      isValid = false;
    } else if (!validateMobileNo(form.mobileNo)) {
      newErrors.mobileNo = 'Mobile number must start with 7, 8, or 9 and be exactly 10 digits long';
      isValid = false;
    }

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    onSave(form);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onCancel(), 300); // Delay onCancel to match the slide-out effect
  };

  return (
    <div className={`form-container ${isVisible ? 'slide-in' : 'slide-out'}`}>
      <h2>{person ? 'Edit Person' : 'Add Person'}</h2>
      <form onSubmit={handleSubmit} className="person-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
          />
          {errors.mobileNo && <p className="error">{errors.mobileNo}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="add-button">Add</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

PersonForm.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    mobileNo: PropTypes.string,
    dob: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PersonForm.defaultProps = {
  person: null,
};

export default PersonForm;
