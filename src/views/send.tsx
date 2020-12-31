import "modern-normalize";
import "../firebase/setup";

import React, {useState} from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const MAX_VIEWER = 2;

const Root = styled.div`
	display: grid;
	grid-auto-flow: row;
	justify-items: center;
	gap: 8px;
`;

const ControlContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-content: center;
	align-items: center;
	gap: 8px;
`;

const Control = styled.div`
	display: grid;
	grid-auto-flow: row;
	justify-content: center;
	justify-items: center;
`;

const App: React.FunctionComponent = () => {
	const [id, setId] = useState("");
	const [resolution, setResolution] = useState("1280,720");
	const [fps, setFps] = useState("60");
	const [maxBitrate, setMaxBitrate] = useState("");

	const [width, height] = resolution.split(",");
	const ninjaUrl = new URL("https://obs.ninja/");
	const params = [
		["stereo", "1"],
		["webcam", ""],
		["quality", ""],
		["maxviewers", MAX_VIEWER.toString()],
		["push", id],
		["width", width],
		["height", height],
		["fps", fps],
		["maxbitrate", maxBitrate],
	] as const;
	for (const param of params) {
		ninjaUrl.searchParams.append(param[0], param[1]);
	}

	return (
		<div>
			<Root>
				<h1>送信用ページ</h1>
				<div>現在の送信URL: {ninjaUrl.href}</div>
				{id && (
					<iframe
						src={ninjaUrl.href}
						width={1280}
						height={720}
						allow='camera;microphone'
					></iframe>
				)}
				<Control>
					<label>送信先ID</label>
					<input
						type='text'
						value={id}
						onChange={(e) => setId(e.target.value)}
					></input>
				</Control>
				<ControlContainer>
					<Control>
						<label>解像度</label>
						<select
							defaultValue='1280,720'
							onChange={(e) => setResolution(e.target.value)}
						>
							<option value='1920,1080' label='16:9 | 1920x1080'></option>
							<option value='1280,720' label='16:9 | 1280x720'></option>
							<option value='800,450' label='16:9 | 800x450'></option>
							<option value='640,360' label='16:9 | 640x360'></option>
							<option value='1600,1200' label='4:3 | 1600x1200'></option>
							<option value='1200,900' label='4:3 | 1200x900'></option>
							<option value='800,600' label='4:3 | 800x600'></option>
							<option value='600,450' label='4:3 | 600x450'></option>
						</select>
					</Control>
					<Control>
						<label>FPS</label>
						<select defaultValue='60' onChange={(e) => setFps(e.target.value)}>
							<option value='60' label='60'></option>
							<option value='30' label='30'></option>
						</select>
					</Control>
					<Control>
						<label>最大ビットレート</label>
						<select
							defaultValue=''
							onChange={(e) => setMaxBitrate(e.target.value)}
						>
							<option value='' label='無制限'></option>
							<option value='10000' label='10000kbps'></option>
							<option value='6000' label='6000kbps'></option>
							<option value='4000' label='4000kbps'></option>
							<option value='2000' label='2000kbps'></option>
							<option value='1000' label='1000kbps'></option>
						</select>
					</Control>
				</ControlContainer>
				<button onClick={() => {}}>再読込</button>
			</Root>
		</div>
	);
};

ReactDOM.render(<App></App>, document.querySelector("#root"));
