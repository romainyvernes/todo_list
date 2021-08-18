import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALjb9B3f9Xt0V37H29oUkH8LUWh50P1q8",
  authDomain: "todolist-82bf5.firebaseapp.com",
  projectId: "todolist-82bf5",
  storageBucket: "todolist-82bf5.appspot.com",
  messagingSenderId: "12575396198",
  appId: "1:12575396198:web:3950ae4bf2f6c97dcc78a7",
  measurementId: "G-RN67RX2XWZ"
};

firebase.initializeApp(firebaseConfig);