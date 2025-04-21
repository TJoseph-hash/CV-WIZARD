import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import {firebaseConfig} from './config.js';
 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const submit = document.getElementById('signup-form');
submit.addEventListener("submit",  function (event) {
    event.preventDefault();

    const gmail = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;

    try {
        signInWithEmailAndPassword(auth, gmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up successfully:", user);
                alert("Sign-up successful!");
                window.location.href = "./main.html";
            })
            .catch((error) => {
                console.error("Error during sign-up:", error.code, error.message);
                alert(`Error: ${error.message}`);
            });
    } catch (error) {
        console.error("Error during sign-up:", error.code, error.message);
        alert(`Error: ${error.message}`);
    }
});

