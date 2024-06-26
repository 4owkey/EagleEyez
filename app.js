import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase for log in page
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();



const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm['username'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Redirect to dashboard or perform other actions
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login failed:', errorMessage);
            // Handle login error (e.g., display error message)
        });
});



// Get a reference to the registration form
const registrationForm = document.getElementById('registration-form');

// Add a listener for form submission
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get user inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Create a new user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            // Update user profile (optional)
            user.updateProfile({
                displayName: username
            }).then(() => {
                // Profile updated successfully
                console.log("User registered successfully");
                // You can redirect the user to another page or perform any other action here
            }).catch((error) => {
                console.error("Error updating profile: ", error);
            });
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
});

/* home */
const menu = document.querySelector('mobile-menu')
const menuLinks = document.querySelector('.navba__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

/* registration */
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const form = document.getElementById('registration-form');
    const feedbackMessage = document.getElementById('passwordFeedback');

    function assessPasswordStrength(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z\d]/.test(password);
        
        let feedbackText = "Password is ";
        let strength = "weak";

        if (password.length <= 10 && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
            strength = "strong";
            feedbackText += "Strong.";
        } else if (password.length <= 10 && (hasUppercase || hasLowercase || hasNumber || hasSpecialChar)) {
            strength = "good";
            feedbackText += "Good.";
        } else if (password.length <= 10) {
            feedbackText += "Weak. Please include uppercase letters, lowercase letters, numbers, and special characters.";
        } else {
            feedbackText += "Password shouldn't be more than 10 characters.";
        }

        return { feedbackText, className: strength };
    }

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const feedback = assessPasswordStrength(password);
    
        if (password !== confirmPassword) {
            feedback.feedbackText += " Passwords do not match.";
            feedback.className = 'weak';
        }
    
        feedbackMessage.textContent = feedback.feedbackText;
        feedbackMessage.className = feedback.className;
    }

    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', function(event) {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length > 10 || password !== confirmPassword) {
            event.preventDefault();
            alert('Your password does not meet the criteria or passwords do not match.');
        }
    });
});