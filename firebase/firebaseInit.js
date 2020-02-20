//import firebase from 'firebase'
// Firebase App (the core Firebase SDK) is always required and must be listed first
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");
const firebase = require('firebase');


// If you enabled Analytics in your project, add the Firebase SDK for Analytics


var firebaseConfig = ("./firebaseConfig");
const fbApp = firebase.initializeApp({
    apiKey: "AIzaSyCNPHepMzvVVRdBJ5rggNjfoLTYfcgmPoI",
    authDomain: "smartgrocery-88590.firebaseapp.com",
    databaseURL: "https://smartgrocery-88590.firebaseio.com",
    projectId: "smartgrocery-88590",
    storageBucket: "smartgrocery-88590.appspot.com",
    messagingSenderId: "470019347392",
    appId: "1:470019347392:web:cbf759c897c4c3d099ae25",
    measurementId: "G-2QKWXGGSYZ"
});

const auth = fbApp.auth();
const db = fbApp.firestore();

console.log(fbApp);

module.exports = {
    db,
    auth
};