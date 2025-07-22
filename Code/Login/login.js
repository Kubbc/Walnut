// firebase-auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV-s-3VqHvsLXnWjBhU-Bhhp_cYYQYiVI",
  authDomain: "walnut-f44a2.firebaseapp.com",
  projectId: "walnut-f44a2",
  storageBucket: "walnut-f44a2.firebasestorage.app",
  messagingSenderId: "858086274106",
  appId: "1:858086274106:web:85bfe45cc8022f3ed87103"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
document.querySelectorAll('.loginBtn')[0].addEventListener('click', () => {
  const email = document.querySelectorAll('.loginBox')[0].value;
  const password = document.querySelectorAll('.loginBox')[1].value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "/Code/Main/home.html")
    .catch((error) => alert("Login failed: " + error.message));
});

// SIGN UP
document.querySelectorAll('.loginBtn')[1].addEventListener('click', () => {
  const email = document.querySelectorAll('.loginBox')[0].value;
  const password = document.querySelectorAll('.loginBox')[1].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "/Code/Main/home.html")
    .catch((error) => alert("Signup failed: " + error.message));
});
