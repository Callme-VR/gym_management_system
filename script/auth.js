import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorMsg.textContent = "Please enter email and password";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User signed in:", user.email);

    // Role-based redirect
    // Make sure to replace these with your actual admin emails
    const adminEmails = ["admin@gmail.com", "admin1@gmail.com", "admin@yourdomain.com", "your-admin-email@domain.com"];
    
    if (adminEmails.includes(email)) {
      console.log("Redirecting to admin panel");
      window.location.href = "admin.html";   // Admin dashboard
    } else {
      console.log("Redirecting to member panel");
      window.location.href = "member.html";  // Member dashboard
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMsg.textContent = "Invalid email or password!";
  }
});