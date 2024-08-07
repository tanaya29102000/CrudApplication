import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const EditPerson = ({ persons, onUpdate, onCancel }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ name: '', email: '', mobileNo: '', dob: '' });

  useEffect(() => {
    if (index >= 0 && index < persons.length) {
      setPerson(persons[index]);
    }
  }, [index, persons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(person);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={person.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={person.email} onChange={handleChange} required />
      </label>
      <label>
        Mobile No:
        <input type="text" name="mobileNo" value={person.mobileNo} onChange={handleChange} required />
      </label>
      <label>
        DOB:
        <input type="date" name="dob" value={person.dob} onChange={handleChange} required />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditPerson;
