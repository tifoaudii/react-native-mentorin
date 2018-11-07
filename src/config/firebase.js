import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDySneQ30Z-OCgfkLfLDn-B1bQY1XK2Z_M",
    authDomain: "mentorin-e48c1.firebaseapp.com",
    databaseURL: "https://mentorin-e48c1.firebaseio.com",
    projectId: "mentorin-e48c1",
    storageBucket: "mentorin-e48c1.appspot.com",
    messagingSenderId: "854067441141"
};

export default ()=>{
  if (!firebase.apps.length)
    firebase.initializeApp(config);
};