import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const addMemberBtn = document.getElementById("addMemberBtn");
const tableBody = document.querySelector("#memberTable tbody");
const membersRef = collection(db, "members");

// 🔹 Add Member
addMemberBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const fee = document.getElementById("fee").value;
  const joinDate = document.getElementById("joinDate").value;
  const gender = document.getElementById("gender").value;
  const plan = document.getElementById("plan").value;
  const diet = document.getElementById("diet").value;

  if (!name || !email || !fee || !joinDate || !gender || !plan || !diet) {
    alert("Please fill all fields");
    return;
  }

  try {
    const docRef = await addDoc(membersRef, { name, email, fee, joinDate, gender, plan, diet });
    console.log("Member added with ID: ", docRef.id);
    alert("Member added successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error adding member: ", error);
    alert("Error adding member: " + error.message);
  }
});

// 🔹 Display Members
async function loadMembers() {
  try {
    const snapshot = await getDocs(membersRef);
    console.log("Total members found:", snapshot.size);
    
    tableBody.innerHTML = "";
    
    if (snapshot.empty) {
      tableBody.innerHTML = "<tr><td colspan='8'>No members found</td></tr>";
      return;
    }
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      console.log("Member data:", data);
      
      const row = `
        <tr>
          <td>${data.name || 'N/A'}</td>
          <td>${data.email || 'N/A'}</td>
          <td>₹${data.fee || 'N/A'}</td>
          <td>${data.joinDate || 'N/A'}</td>
          <td>${data.gender || 'N/A'}</td>
          <td>${data.plan || 'N/A'}</td>
          <td>${data.diet || 'N/A'}</td>
          <td><button onclick="deleteMember('${docSnap.id}')">Delete</button></td>
        </tr>`;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading members: ", error);
    tableBody.innerHTML = `<tr><td colspan='8'>Error loading members: ${error.message}</td></tr>`;
  }
}

loadMembers();

// 🔹 Delete Member
window.deleteMember = async (id) => {
  if (confirm("Are you sure you want to delete this member?")) {
    try {
      await deleteDoc(doc(db, "members", id));
      console.log("Member deleted with ID: ", id);
      alert("Member deleted!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting member: ", error);
      alert("Error deleting member: " + error.message);
    }
  }
};