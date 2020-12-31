import "modern-normalize";
import React, {useRef, useState} from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const Root = styled.div`
	display: grid;
	grid-auto-flow: row;
	justify-items: center;
	gap: 8px;
`;
const Player = styled.iframe``;

const App: React.FunctionComponent = () => {
	const [id, setId] = useState("default");
	const inputRef = useRef<HTMLInputElement>(null);
	const playerRef = useRef<HTMLIFrameElement>(null);
	const playerUrl = `https://obs.ninja/?stereo=1&codec=vp9&view=${id}`;
	return (
		<Root>
			<Player
				src={playerUrl}
				width={1280}
				height={720}
				allow='camera;microphone'
				ref={playerRef}
			></Player>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (!inputRef.current) {
						return;
					}
					setId(inputRef.current.value);
				}}
			>
				<input type='text' ref={inputRef}></input>
				<input type='submit' value='決定'></input>
			</form>
			<button
				onClick={() => {
					if (playerRef.current) {
						playerRef.current.src = playerUrl;
					}
				}}
			>
				再読込
			</button>
		</Root>
	);
};

ReactDOM.render(<App></App>, document.querySelector("#root"));
