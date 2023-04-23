import React,{useState} from "react";
import "../App.css";
import axios from "axios";


export default function DependencyVisualizer() {
	const [searchTerm, setSearchTerm] = useState("");
	const [reqtext, setreqtext] = useState("");


	// reqtext="/home/swamikedari/Documents/pydoc/Documentation_Generator/src/function_visualization.png"
	function handleSearchTermChange(event) {
		setSearchTerm(event.target.value);
	}

	const handleButtonClick = async (event) => {
		console.log("srch term...", searchTerm);
		event.preventDefault();
		const response = await axios.post(
			"http://127.0.0.1:8000/api/getfunctiongraph",
			{
				input: searchTerm,
			}
		);
		console.log('helooooo.....',response.data.output)
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
			
		</div>

		<div className="Image_Dependency my-4">
			<img src={require("/home/swamikedari/Documents/pydoc/Documentation_Generator/src/function_visualization.png")} alt="My Image" />
    </div>


		</div>
		</div>
	);
	
}
