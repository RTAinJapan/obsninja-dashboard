import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDViVPUV-LWBJm2xCcYiVPmoEFqlKZ54Hs",
	authDomain: "rtainjapan.firebaseapp.com",
	databaseURL: "https://rtainjapan-default-rtdb.firebaseio.com",
	projectId: "rtainjapan",
	storageBucket: "rtainjapan.appspot.com",
	messagingSenderId: "669440518601",
	appId: "1:669440518601:web:3e63b411d54c5ecdc46018",
	measurementId: "G-D2T15DJ2SW",
};

firebase.initializeApp(firebaseConfig);
