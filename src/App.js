import React, { useState } from 'react';
import PersonTable from './components/PersonTable';
import PersonForm from './components/PersonForm';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (person) => {
    if (editingIndex === null) {
      setPersons([...persons, person]);
    } else {
      const updatedPersons = [...persons];
      updatedPersons[editingIndex] = person;
      setPersons(updatedPersons);
    }
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setPersons(persons.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <h1>Person Details</h1>
      <PersonForm
        person={editingIndex !== null ? persons[editingIndex] : null}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <PersonTable
        persons={persons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
