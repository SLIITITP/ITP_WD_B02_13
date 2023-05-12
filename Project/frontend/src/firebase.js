// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAyFVrG-b1mV8qyJ6llPI_GtPhqZdyOW98",
	authDomain: "project1-62588.firebaseapp.com",
	projectId: "project1-62588",
	storageBucket: "project1-62588.appspot.com",
	messagingSenderId: "208475488622",
	appId: "1:208475488622:web:46678cae09091ea380c17f",
	measurementId: "G-V46RRRCKVQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
