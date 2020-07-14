import * as firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyBnHIyr_NSkaF7e7k34s8h_oysISsAawMk",
    authDomain: "yego-admin.firebaseapp.com",
    databaseURL: "https://yego-admin.firebaseio.com",
    projectId: "yego-admin",
    storageBucket: "yego-admin.appspot.com",
    messagingSenderId: "297866010307",
    appId: "1:297866010307:web:47b9149cfdcc1daf9f4c76",
    measurementId: "G-PFL5N99C1R"
  };

//key DEV
// var firebaseConfig = {
//   apiKey: "AIzaSyBQ0ZVq70zsP_DniyS7nG7lFJ1qy3YRLic",
//   authDomain: "routes-4a17b.firebaseapp.com",
//   databaseURL: "https://routes-4a17b.firebaseio.com",
//   projectId: "routes-4a17b",
//   storageBucket: "routes-4a17b.appspot.com",
//   messagingSenderId: "592693186701",
//   appId: "1:592693186701:web:64478b1556b3efd90fd2c4",
//   measurementId: "G-PBCS1H7YR9"
// };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;