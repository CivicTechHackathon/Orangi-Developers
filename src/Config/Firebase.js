 import * as firebase from 'firebase'

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAVtTpHhJRxOATUOOlWlNZGXzS_CXjD1XY",
    authDomain: "civictech-hackathon.firebaseapp.com",
    databaseURL: "https://civictech-hackathon.firebaseio.com",
    projectId: "civictech-hackathon",
    storageBucket: "civictech-hackathon.appspot.com",
    messagingSenderId: "841237329615"
  };
  firebase.initializeApp(config);

  export default firebase