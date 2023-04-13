import React, { useState } from "react";
import { useRef } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import CodeSummarizer from "./pages/CodeSummarizer";
import CodingStyleGuide from "./pages/CodingStyleGuide";
import DependencyVisualizer from "./pages/DependencyVisualizer";
import Home from "./pages/Home";
import ReleaseNotes from "./pages/ReleaseNotes";
import RequirementsFileGenerator from "./pages/RequirementsFileGenerator";
import TroubleshootingGuide from "./pages/TroubleshootingGuide";

import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";

function App() {
	const [searchTerm, setSearchTerm] = useState("");

	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

	function handleButtonClick() {
		// Handle button click here
	}

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
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/codesummarizer" element={<CodeSummarizer />} />
				<Route path="/codingstyleguide" element={<CodingStyleGuide />} />
				<Route path="dependencyvisualizer" element={<DependencyVisualizer />} />
				<Route path="releasenotes" element={<ReleaseNotes />} />
				<Route
					path="requirementsfilegenerator"
					element={<RequirementsFileGenerator />}
				/>
				<Route path="troubleshootingguide" element={<TroubleshootingGuide />} />
			</Routes>
		</div>
	);
}
export default App;
