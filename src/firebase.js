import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAR1ppML9QavBiY-Uv_KMyqQ4FYF_Evlh8",
  authDomain: "messenger-clone-99fd5.firebaseapp.com",
  databaseURL: "https://messenger-clone-99fd5.firebaseio.com",
  projectId: "messenger-clone-99fd5",
  storageBucket: "messenger-clone-99fd5.appspot.com",
  messagingSenderId: "478318909731",
  appId: "1:478318909731:web:240d0605451cc6f5239496",
  measurementId: "G-7Q10V65730",
});

const db = firebaseApp.firestore();

export default db;
