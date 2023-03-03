import React, { useState } from 'react';
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = () => {
    console.log(`Input value: ${inputValue}`);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="sections">
        <div className="section1">Section 1
		</div>
        <div className="section2">
		<input
          type="text"
          placeholder="Enter the code here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
		</div>
        <div className="section3">
		<input
          type="text"
          placeholder="Documented code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
		</div>
		<div className="section4">Section 4
		</div>
			
		</div>
      </div>
    
  );
}

export default App;
