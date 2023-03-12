import React, { useState } from "react";
import { useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [textLeft, setTextLeft] = useState("");
	const [textRightTop, setTextRightTop] = useState("");
	const [textRightBottom, setTextRightBottom] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState("home");
	const ref = useRef(null);

	const handleSubmit = async (event) => {
	  console.log(textRightTop);
	  event.preventDefault();
	  const response = await axios.post('http://127.0.0.1:8000/api/processInput', {
		input: textRightTop
	  });
	  setTextRightBottom(response.data.output);
	}
	// const handleSubmit = (event) => {
	// 	axios
	// 		.post(
	// 			`http://127.0.0.1:8000/api/processInput`
	// 		)
	// 		.then((textRightTop) => {
	// 			console.log(`Posted ${textRightTop}`);
	// 		})
	// 		.catch((err) => {
	// 			console.log(`Error : ${err}`);
	// 		});
	// };

	function handleTextLeftChange(event) {
		setTextLeft(event.target.value);
	}

	function handleTextRightTopChange(event) {
		// console.log(event.target.value);
		setTextRightTop(event.target.value);
		// console.log(textRightTop);
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

	function handlePageChange(page) {
		setCurrentPage(page);
	}

	let currentPageContent;

	switch (currentPage) {
		case "page1":
			currentPageContent = <h1>Page 1 Content Goes Here</h1>;
			break;
		case "page2":
			currentPageContent = <h1>Page 2 Content Goes Here</h1>;
			break;
		case "page3":
			currentPageContent = <h1>Page 3 Content Goes Here</h1>;
			break;
		default:
			currentPageContent = (
				<>
					<div className="section1">{/* Display files and folders here */}</div>
					<div className="section2">
						<textarea
							value={textRightTop}
							ref={ref}
							placeholder="Enter the code here"
							onChange={handleTextRightTopChange}
						/>
					</div>
					<div className="section3">
						<textarea
							value={textRightBottom}
							placeholder="Documented Code"
							onChange={handleTextRightBottomChange}
						/>
					</div>
					<div className="section4">
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</>
			);
			break;
	}

	return (
		<div className="container">
			<div className="navbar">
				<div className="navbar-brand">Documentation Generator</div>
				<div className="navbar-links">
					<button onClick={() => handlePageChange("home")}>Home</button>
					<button onClick={() => handlePageChange("page1")}>Page 1</button>
					<button onClick={() => handlePageChange("page2")}>Page 2</button>
					<button onClick={() => handlePageChange("page3")}>Page 3</button>{" "}
				</div>
			</div>

			<div className="input-container">
				<input
					type="text"
					value={searchTerm}
					placeholder="Enter the URL here"
					onChange={handleSearchTermChange}
				/>
				<button onClick={handleButtonClick}>Fetch</button>
			</div>
			<div className="sections">{currentPageContent}</div>
		</div>
	);
}
export default App;