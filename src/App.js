import React, { useState } from "react";
import "./App.css";

function App() {
	const [link, setLink] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(link);
	};

	const handleChange = (event) => {
		setLink(event.target.value);
	};

	return (
		<div className="app-container">
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="link-input">Enter Repo Link:</label>
					<div className="input-container">
						<input
							type="text"
							id="link-input"
							value={link}
							onChange={handleChange}
							placeholder="https://example.com"
						/>
						<button type="submit" className="fetch-button">
							Fetch
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
