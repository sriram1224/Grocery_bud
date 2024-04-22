// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [groceries, setGroceries] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedGroceries = JSON.parse(localStorage.getItem('groceries'));
    if (storedGroceries) {
      setGroceries(storedGroceries);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groceries', JSON.stringify(groceries));
  }, [groceries]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setGroceries([...groceries, inputValue.trim()]);
      setInputValue('');
    }
  };

  const deleteGrocery = (index) => {
    const newGroceries = [...groceries];
    newGroceries.splice(index, 1);
    setGroceries(newGroceries);
  };

  return (
    <div className="App">
      <h1>Grocery Bud</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter grocery item" />
        <button type="submit">Add Grocery</button>
      </form>
      <ul>
        {groceries.map((grocery, index) => (
          <li key={index}>
            {grocery}
            <button onClick={() => deleteGrocery(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
