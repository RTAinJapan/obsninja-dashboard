import {useEffect, useState} from "react";
import firebase from "firebase/app";

export const useUser = () => {
	const [user, setUser] = useState<firebase.User | null>(null);
	useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged((user) => {
				setUser(user);
			});
		return () => unregisterAuthObserver();
	});
	return user;
};

export const useIsSignedIn = () => {
	const user = useUser()
	return Boolean(user)
}
