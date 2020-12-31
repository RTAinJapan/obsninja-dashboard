import {css, Global} from "@emotion/react";
import firebase from "firebase/app";
import {useEffect, useState} from "react";
import {FirebaseAuth} from "react-firebaseui";
import {useIsSignedIn} from "./authentication";

const globalStyles = (
	<Global
		styles={css`
			#firebaseui_container {
				position: fixed;
				height: 100vh;
				width: 100vw;
			}
		`}
	></Global>
);

const uiConfig = {
	signInFlow: "popup",
	signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
	callbacks: {
		signInSuccessWithAuthResult: () => false,
	},
};

export const SignIn: React.FunctionComponent = () => {
	const [isSetupPersistence, setIsSetupPersistence] = useState(false);
	const isSignedIn = useIsSignedIn();

	useEffect(() => {
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsSetupPersistence(true);
			});
	}, []);

	if (!isSetupPersistence || isSignedIn) {
		return null;
	}

	return (
		<>
			{globalStyles}
			<FirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
			></FirebaseAuth>
		</>
	);
};
