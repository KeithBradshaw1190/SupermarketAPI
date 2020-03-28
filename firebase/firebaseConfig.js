if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
module.exports = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "smartgrocery-88590.firebaseapp.com",
    databaseURL: "https://smartgrocery-88590.firebaseio.com",
    projectId: "smartgrocery-88590",
    storageBucket: "smartgrocery-88590.appspot.com",
    messagingSenderId: "470019347392",
    appId: "1:470019347392:web:cbf759c897c4c3d099ae25",
    measurementId: "G-2QKWXGGSYZ"
}