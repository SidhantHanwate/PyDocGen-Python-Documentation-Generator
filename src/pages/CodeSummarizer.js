import React, { useState } from "react";
import { useRef } from "react";
import "../App.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
export default function codeSummarizer(props) {
	const [textRightTop, setTextRightTop] = useState("");
	const [textRightBottom, setTextRightBottom] = useState("");
	const ref = useRef(null);
	const filearray = props.filearray;
	

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

	function handleTextRightTopChange(event) {
		// console.log(event.target.value);
		setTextRightTop(event.target.value);
		// console.log(textRightTop);
	}

	function handleTextRightBottomChange(event) {
		setTextRightBottom(event.target.value);
	}

	let currentPageContent = null;
	currentPageContent = (
		<>
			<div className="section1">
			<Sidebar buttonNames={filearray} setTextRightTop={setTextRightTop} />
			</div>
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
		<div className="CodeSum">{currentPageContent}</div>
	);
}
