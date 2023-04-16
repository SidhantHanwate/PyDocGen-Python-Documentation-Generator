import React, { useState } from "react";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({ buttonNames, setTextRightTop }) => {
  const [activeButton, setActiveButton] = useState(0);
  console.log("helooooo", buttonNames)
  const handleButtonClick = async (buttonIndex) => {
    setActiveButton(buttonIndex);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/loadcontent",
        {
          input: buttonNames[buttonIndex]
        }
      );
      console.log("returned text...........", response.data);
      setTextRightTop(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };

  const renderButtons = () => {
    return buttonNames.map((buttonName, index) => {
      // Split the buttonName URL by "/"
      const urlParts = buttonName.split("/");
      // Get the last part of the URL, which should be the filename
      const filename = urlParts[urlParts.length - 1];
  
      return (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={activeButton === index ? "active" : ""}
        >
          {filename}
        </button>
      );
    });
  };
  

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="button-container">{renderButtons()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
