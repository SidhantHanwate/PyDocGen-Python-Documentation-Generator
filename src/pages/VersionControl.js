// import React, { useState } from "react";
// import { useRef } from "react";
// import "../App.css";
// import axios from "axios";

// export default function VersionControl() {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [reqtext, setreqtext] = useState("");
// 	var ll=[]

// 	function handleSearchTermChange(event) {
// 		setSearchTerm(event.target.value);
// 	}

// 	function CardView(props) {
// 		return (
// 		  <div>
// 			{props.data.map((item, index) => (
// 			  <div key={index} className="card">
// 				<p>{item}</p>
// 			  </div>
// 			))}
// 		  </div>
// 		);
// 	  }

	
	
// 	  function handlereqtext(event){
// 		setreqtext(event.target.value);
// 	}
// 	const handleButtonClick = async (event) => {
// 		// console.log(textRightTop);
// 		event.preventDefault();
// 		const response = await axios.post(
// 			"http://127.0.0.1:8000/api/fetchversion",
// 			{
// 				input: searchTerm,
// 			}

// 		);
// 		//console.log(response.data.output)
// 		// console.log(response.data.output.split("$"))
// 		setreqtext(response.data.output)
// 		ll=response.data.output.split("$")
// 		console.log(ll)

// 	};

// 	return (
// 		<div className="container2">
// 			<div className="input-container">
// 				<input
// 					type="text"
// 					value={searchTerm}
// 					placeholder="Enter the URL here"
// 					onChange={handleSearchTermChange}
// 				/>
				
// 				<button onClick={handleButtonClick}>Fetch</button>
// 			</div>
// 			<div className="release">
// 						<textarea
// 							value={reqtext}
// 							placeholder="Version Control"
// 							onChange={handlereqtext}
// 						/>
						
// 						{/* <CardView data={{reqtext}.split("$")} /> */}
// 					</div>
// 					{/* <div><CardView data={ll} /></div> */}
// 		</div>
// 	);
// }
import React, { useState } from "react";
import { useRef } from "react";
import "../App.css";
import axios from "axios";

export default function VersionControl() {
	const [searchTerm, setSearchTerm] = useState("");
	const [reqtext, setreqtext] = useState("");
	const [cardData, setCardData] = useState([]);

	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

	function CardView(props) {
		return (
			<div>
				{props.data.map((item, index) => (
					<div key={index} className="card">
						<p>{item}</p>
					</div>
				))}
			</div>
		);
	}

	function handlereqtext(event) {
		setreqtext(event.target.value);
	}

	async function handleButtonClick(event) {
		event.preventDefault();
		const response = await axios.post(
			"http://127.0.0.1:8000/api/fetchversion",
			{
				input: searchTerm,
			}
		);
		setreqtext(response.data.output);
		const data = response.data.output.split("$");
		setCardData(data);
	}

	return (
		<div className="container2">
			<div className="input-container">
				<input
					type="text"
					value={searchTerm}
					placeholder="Enter the URL here"
					onChange={handleSearchTermChange}
				/>

				<button onClick={handleButtonClick}>Fetch</button>
			</div>
			{/* <div className="release">
				<textarea
					value={reqtext}
					placeholder="Version Control"
					onChange={handlereqtext}
				/>
			</div> */}
			{cardData.length > 0 && <CardView data={cardData} />}
		</div>
	);
}
