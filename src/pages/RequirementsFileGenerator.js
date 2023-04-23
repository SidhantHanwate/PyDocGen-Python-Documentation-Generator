import React,{useState} from "react";
import "../App.css";
import axios from "axios";

export default function RequirementsFileGenerator() {
	const [searchTerm, setSearchTerm] = useState("");
	const [reqtext, setreqtext] = useState("");

	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

	const handleButtonClick = async (event) => {
		console.log("srch term...", searchTerm);
		event.preventDefault();
		const response = await axios.post(
			"http://127.0.0.1:8000/api/getrequire",
			{
				input: searchTerm,
			}
		);
		console.log(response.data.output)
		setreqtext(response.data.output)
		// setTextRightBottom(response.data.output);
	};

	function handlereqtext(event){
		setreqtext(event.target.value);
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
			<div className="requirements my-4">
						<textarea
							value={reqtext}
							placeholder="Requirements"
							onChange={handlereqtext}
						/>
					</div>
		</div>
		</div>
		</div>
	);
}
