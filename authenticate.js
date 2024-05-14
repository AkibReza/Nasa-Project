// authenticate.js

// Function to authenticate the user
function authenticate(username, password) {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Store the authenticated user's data in localStorage
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    return true; // Authentication successful
  } else {
    return false; // Authentication failed
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  const registerFormContainer = document.querySelector(
    ".register-form-container"
  );
  const loginFormContainer = document.querySelector(".login-form-container");

  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginFormContainer.style.display = "none";
    registerFormContainer.style.display = "block";
  });

  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    registerFormContainer.style.display = "none";
    loginFormContainer.style.display = "block";
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const user = { username, password };
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    if (authenticate(username, password)) {
      alert("Login successful!");
      // Redirect to index.html or any other page after successful login
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password.");
    }
  });
});
