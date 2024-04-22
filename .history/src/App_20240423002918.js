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
      setGroceries([...groceries, { name: inputValue.trim(), checked: false }]);
      setInputValue('');
    }
  };

  const handleCheckChange = (index) => {
    const newGroceries = [...groceries];
    newGroceries[index].checked = !newGroceries[index].checked;
    setGroceries(newGroceries);
  };

  const deleteGrocery = (index) => {
    const newGroceries = [...groceries];
    newGroceries.splice(index, 1);
    setGroceries(newGroceries);
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {groceries.map((grocery, index) => (
          <li key={index} className="grocery-item">
            <input type="checkbox" checked={grocery.checked} onChange={() => handleCheckChange(index)} />
            <span style={{ textDecoration: grocery.checked ? 'line-through' : 'none' }}>{grocery.name}</span>
            <button onClick={() => deleteGrocery(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;