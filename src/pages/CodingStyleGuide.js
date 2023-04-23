import React, { useState } from "react";
import { useRef } from "react";
import "../components/CodingStyleGuide.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import StarRating from "../components/StarRating";


export default function CodingStyleGuide() {
	const [textRightTop, setTextRightTop] = useState("");
	const [textRightBottom, setTextRightBottom] = useState("");
	const ref = useRef(null);
	// const filearray = props.filearray;

	const [searchTerm, setSearchTerm] = useState("");
	const [filearray, setFilearray] = useState([])

	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

		const handleButtonClick = async (event) => {
		// console.log(textRightTop);
		event.preventDefault();
		const response = await axios.post(
			"http://127.0.0.1:8000/api/fetchdata",
			{
				input: searchTerm,
			}
		);
		// setTextRightBottom(response.data.output);
		setFilearray(response.data.output.toString().split(","))
  		console.log("inside fn", filearray);
	};

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

	return (
		<div className="">
			<div className="row">
				<div className="container-fluid">
					<div className="input-container mt--5">
						<input
							type="text"
							value={searchTerm}
							placeholder="Enter the URL here"
							onChange={handleSearchTermChange}
						/>
						<button onClick={handleButtonClick}>Fetch</button>
					</div>
				</div>
				<div className="d-flex p-1">
					<div className="section1cs">
						<Sidebar buttonNames={filearray} setTextRightTop={setTextRightTop} />
					</div>
					{/* <div className="section2">
						<textarea
							value={textRightTop}
							ref={ref}
							placeholder="Enter the code here"
							onChange={handleTextRightTopChange}
						/>
					</div> */}
					<div className="section3">
						<StarRating />
					</div>
					
					<div className="section4">
					<button
						type="button"
						className="btn"
						onClick={handleSubmit}
						style={{ backgroundColor: "#4d05b9", color: "white", width: "151px", fontSize: "20px", fontWeight: "bold" ,  position: "absolute", bottom: 0, alignContent: "center" }}
						>
						Submit
					</button>

					</div>
				</div>
			</div>
		</div>
	);
}
