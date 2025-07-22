import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBV-s-3VqHvsLXnWjBhU-Bhhp_cYYQYiVI",
  authDomain: "walnut-f44a2.firebaseapp.com",
  projectId: "walnut-f44a2",
  storageBucket: "walnut-f44a2.firebasestorage.app",
  messagingSenderId: "858086274106",
  appId: "1:858086274106:web:85bfe45cc8022f3ed87103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Now getAuth will work
const auth = getAuth(app);

// Logout button functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "../../Code/Login/login.html"; // Adjust if needed
  }).catch((error) => {
    console.error("Error during sign-out:", error.message);
  });
});
