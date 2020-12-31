import styled from "@emotion/styled";
import firebase from "firebase/app";
import React from "react";
import {useUser} from "./authentication";

const singOut = async () => {
	const confirmed = confirm("ログアウトしますか?");
	if (confirmed) {
		firebase
			.auth()
			.signOut()
			.catch((error) => {
				console.error(error);
			});
	}
};

const Container = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	display: grid;
	grid-auto-flow: row;
	justify-items: end;
`;

export const SignOut: React.FunctionComponent = () => {
	const user = useUser();
	if (!user) {
		return null;
	}
	return (
		<Container>
			ログイン中: {user.displayName}
			<br></br>
			<button onClick={singOut}>ログアウト</button>
		</Container>
	);
};
