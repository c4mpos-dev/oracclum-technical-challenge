import { auth } from "../src/services/firebaseConfig";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "/login";
    } else {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("content").style.display = "block";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sign-out-btn").addEventListener("click", async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert("Erro ao deslogar: " + error.message);
        }
    });
});