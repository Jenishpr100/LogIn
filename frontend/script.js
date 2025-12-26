const API = "https://vapourish-lauretta-retroactive.ngrok-free.dev";

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");

  document.getElementById("message").textContent = "";
}

function showRegister() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");

  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");

  document.getElementById("message").textContent = "";
}

function togglePassword(id, btn) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";

  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!username || !password) {
    message.textContent = "Fill out everything completly";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const text = await res.text();
    if (res.ok) {
      message.style.color = "#4cd137";
      message.textContent = text;

      // save username to sessionStorage for dashboard
      sessionStorage.setItem("username", username);

      // redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      message.style.color = "#ff6b6b";
      message.textContent = text;
    }
  } catch {
    message.textContent = "Server offline";
  }
}

async function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;
  const message = document.getElementById("message");

  if (!username || !password || !confirm) {
    message.textContent = "Fill out everything comepletly";
    return;
  }

  if (password !== confirm) {
    message.textContent = "Passwords do not match";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const text = await res.text();
    if (res.ok) {
      message.style.color = "#4cd137";
      message.textContent = text;

      // automatically switch to login tab
      showLogin();
    } else {
      message.style.color = "#ff6b6b";
      message.textContent = text;
    }
  } catch {
    message.textContent = "Server offline 🚨";
  }
}


