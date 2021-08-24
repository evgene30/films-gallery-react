import firebase from "firebase/app";
import "firebase/auth";


const app = firebase.initializeApp({
    apiKey: "AIzaSyCQewhiRucgz_7LpfX65urUdfpQtVGdlTA",
    authDomain: "film-users.firebaseapp.com",
    projectId: "film-users",
    storageBucket: "film-users.appspot.com",
    messagingSenderId: "750122800321",
    appId: "1:750122800321:web:1d47c10f13dc2ae637f040"
});

export default app



