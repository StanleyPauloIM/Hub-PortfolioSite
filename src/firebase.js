// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKO2KSsjEcmlK885p7jk2ibuNzDKelUkE",
    authDomain: "hub-theportfoliowebsite.firebaseapp.com",
    projectId: "hub-theportfoliowebsite",
    storageBucket: "hub-theportfoliowebsite.firebasestorage.app",
    messagingSenderId: "626530247851",
    appId: "1:626530247851:web:1d06326b6a6c901a4f03ee",
    measurementId: "G-HW9FGC6GMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);