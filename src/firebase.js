import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCATDXzBXDDlc0Y6esT7s0KnPR3A2f3B0Y",
    authDomain: "izone-mail.firebaseapp.com",
    databaseURL: "https://izone-mail.firebaseio.com",
    projectId: "izone-mail",
    storageBucket: "izone-mail.appspot.com",
    messagingSenderId: "647223039722",
    appId: "1:647223039722:web:2f56e7b1701f69a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export default storage;