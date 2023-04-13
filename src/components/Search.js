import React from "react";
import "../App.css"
export default function Search() {
	return (
		<div className="input-container">
			<input
				type="text"
				value={searchTerm}
				placeholder="Enter the URL here"
				onChange={handleSearchTermChange}
			/>
			<button onClick={handleButtonClick}>Fetch</button>
		</div>
	);
}
