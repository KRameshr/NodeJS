window.onscroll = function () {
  const navbar = document.getElementById("navbar");
  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

// 2. Mobile Menu Toggle
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const icon = document.getElementById("menuBtn");
  nav.classList.toggle("active");
  icon.textContent = nav.classList.contains("active") ? "close" : "menu";
}

// 3. Password Visibility Toggle
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "visibility";
  } else {
    input.type = "password";
    icon.textContent = "visibility_off";
  }
}
