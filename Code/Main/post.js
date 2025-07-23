import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBV-s-3VqHvsLXnWjBhU-Bhhp_cYYQYiVI",
  authDomain: "walnut-f44a2.firebaseapp.com",
  projectId: "walnut-f44a2",
  storageBucket: "walnut-f44a2.firebasestorage.app",
  messagingSenderId: "858086274106",
  appId: "1:858086274106:web:85bfe45cc8022f3ed87103"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Protect the page
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "../../Code/Login/login.html";
  } else {
    loadPosts(); // Load existing posts
  }
});

document.getElementById("submitPost").addEventListener("click", async () => {
  const content = document.getElementById("postContent").value.trim();

  if (!content) {
    alert("Post cannot be empty!");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      content: content,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
      email: auth.currentUser.email
    });

    alert("Post added!");
    document.getElementById("postContent").value = "";
    loadPosts();

  } catch (error) {
    alert("Error adding post: " + error.message);
  }
});

async function loadPosts() {
  const postFeed = document.getElementById("postFeed");
  postFeed.innerHTML = "<hr>";

  const postsSnapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
  postsSnapshot.forEach(doc => {
    const post = doc.data();
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
      <small class="postUser">By ${post.email}</small>
      <small class="postTime"> · ${timeAgo(post.createdAt.toDate())}</small>
      <p class="postContent">${post.content}</p>
    `;
    postFeed.appendChild(postDiv);
  });
}


function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}