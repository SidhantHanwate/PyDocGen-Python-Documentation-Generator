import React,{useState} from "react";
import "../App.css";


export default function RequirementsFileGenerator() {
	const [searchTerm, setSearchTerm] = useState("");
	
	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

	return (
		<div className="container1">
			<div className="input-container">
				<input
					type="text"
					value={searchTerm}
					placeholder="Enter the URL here"
					onChange={handleSearchTermChange}
				/>
				<button>Fetch</button>
			</div>
		</div>
	);
}
