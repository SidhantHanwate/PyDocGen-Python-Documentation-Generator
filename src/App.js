import React, { useState } from "react";
import { useRef } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";

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
		const response = await axios.post(
			"http://127.0.0.1:8000/api/processInput",
			{
				input: textRightTop,
			}
		);
		setTextRightBottom(response.data.output);
	};

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

	let currentPageContent = null;
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

	return (
		<div className="container">
			<Navbar title="Documentation Generator" />
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
