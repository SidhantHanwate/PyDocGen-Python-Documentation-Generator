import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ buttonNames }) => {
  const [activeButton, setActiveButton] = useState(0);
  // const [content, setContent] = useState("Select a button");
  console.log("helooooo", buttonNames)
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setContent(`Content for ${buttonNames[buttonIndex]}`);
  };

  const renderButtons = () => {
    
    
    
    return buttonNames.map((buttonName, index) => (
      <button
        key={index}
        onClick={() => handleButtonClick(index)}
        className={activeButton === index ? "active" : ""}
      >
        {buttonName}
      </button>
    ));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="button-container">{renderButtons()}</div>
      </div>
      {/* <div className="content">{content}</div> */}
    </div>
  );
};

export default Sidebar;