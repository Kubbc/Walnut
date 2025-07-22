import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/Code/Login/login.html";
  }
});