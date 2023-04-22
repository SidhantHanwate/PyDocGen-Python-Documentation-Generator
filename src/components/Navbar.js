import React from "react";
import PropTypes from "prop-types";
// import codeSummarizer from "./pages/CodeSummarizer";
// import CodingStyleGuide from "./pages/CodingStyleGuide";
// import DependencyVisualizer from "./pages/DependencyVisualizer";
// import ReleaseNotes from "./pages/ReleaseNotes";
// import RequirementsFileGenerator from "./pages/RequirementsFileGenerator";
// import TroubleshootingGuide from "./pages/TroubleshootingGuide";

export default function Navbar(props) {
	return (
		<>
			<nav
				className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						{props.title}
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link " aria-current="page" href="/codesummarizer">
									Code Summarizer
								</a>
								{/* <Link to="/">Code Summarizer</Link> */}
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/requirementsFileGenerator">
									Requirements File generator
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/dependencyVisualizer">
									File Dependency Visualizer
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/codingStyleGuide">
									Coding Style Guide
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/versioncontrol">
									Version Control
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/troubleshootingGuide">
									Troubleshooting Guide
								</a>
							</li>
						</ul>
						{/* <form className="d-flex" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form> */}
					</div>
				</div>
			</nav>
			{/* <Routes>  */}
		</>
	);
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
	title: "Title",
};
