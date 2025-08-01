// Handle Signup
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Save user in localStorage
    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("taskverseUser", JSON.stringify(user));
    alert("Signup successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html";
  });
}
// Handle Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("taskverseUser"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid email or password!");
    } else {
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    }
  });
}
// Show user name & handle dashboard access
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

if (userName && logoutBtn) {
  const user = JSON.parse(localStorage.getItem("taskverseUser"));
  if (!user) {
    alert("Please log in first.");
    window.location.href = "index.html";
  } else {
    userName.innerText = `👋 Hello, ${user.name}`;
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("taskverseUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
  });
}


