import React from "react";
import ReactDOM from "react-dom";

const App: React.FunctionComponent = () => {
	return (
		<div>
			<a href='/send'>送信</a>
			<br></br>
			<a href='/receive'>受信</a>
		</div>
	);
};

ReactDOM.render(<App></App>, document.querySelector("#root"));
