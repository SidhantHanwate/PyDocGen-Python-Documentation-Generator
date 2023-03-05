import React, { useState } from 'react';
import './App.css';


function App() {
  
  const [textLeft, setTextLeft] = useState('');
  const [textRightTop, setTextRightTop] = useState('');
  const [textRightBottom, setTextRightBottom] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  function handleTextLeftChange(event) {
    setTextLeft(event.target.value);
  }

  function handleTextRightTopChange(event) {
    setTextRightTop(event.target.value);
  }

  function handleTextRightBottomChange(event) {
    setTextRightBottom(event.target.value);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleButtonClick() {
    // Handle button click here
  }

  return (
    <div className="container">
      <div className="input-container">
      <input type="text" value={searchTerm} placeholder="Enter the URL here" onChange={handleSearchTermChange} />
        <button onClick={handleButtonClick}>Fetch</button>
      </div>
      <div className="sections">
        <div className="section1" >
        <textarea value={textLeft}  onChange={handleTextLeftChange} 
          
        />
	    	</div>
        <div className="section2" >
        <textarea value={textRightTop} placeholder="Enter the code here" onChange={handleTextRightTopChange} />
        </div>
        <div className="section3" >
        <textarea value={textRightBottom} placeholder="Documented Code" onChange={handleTextRightBottomChange} />
        </div>
        <div className="section4" >
        {/* Placeholder div to keep the layout consistent */}
        </div>
		    
		    </div>
        
			
		</div>
     
  );
  
}

export default App;



