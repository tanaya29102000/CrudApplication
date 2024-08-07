import React from 'react';
import '../App.css';

const PersonTable = ({ persons, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{person.name}</td>
            <td>{person.email}</td>
            <td>{person.mobileNo}</td>
            <td>{person.dob}</td>
            <td>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonTable;
