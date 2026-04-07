// ============================
//  DARK MODE TOGGLE
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Restore saved preference
  const savedDark = localStorage.getItem("darkMode") === "true";
  if (savedDark) {
    document.body.classList.add("dark");
    if (toggle) toggle.textContent = "☀️ Light";
  } else {
    if (toggle) toggle.textContent = "🌙 Dark";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark);
      toggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    });
  }

  // ============================
  //  NAVBAR ACTIVE STATE (auto)
  // ============================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Event listener: ripple effect on click
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ============================
  //  DOM: TAMPILKAN LEBIH BANYAK
  // ============================
  const readMoreBtn  = document.getElementById("readMoreBtn");
  const extraDesc    = document.getElementById("extraDesc");
  const readMoreText = document.getElementById("readMoreText");
  const readMoreIcon = document.getElementById("readMoreIcon");

  if (readMoreBtn && extraDesc) {
    readMoreBtn.addEventListener("click", () => {
      const isOpen = extraDesc.classList.contains("show");
      if (isOpen) {
        extraDesc.classList.remove("show");
        readMoreText.textContent = "Tampilkan Lebih Banyak";
        readMoreIcon.textContent = "📖";
      } else {
        extraDesc.classList.add("show");
        readMoreText.textContent = "Tampilkan Lebih Sedikit";
        readMoreIcon.textContent = "📕";
      }
    });
  }

  // ============================
  //  SKILL BARS ANIMATION
  // ============================
  const skillFills = document.querySelectorAll(".skill-fill");
  if (skillFills.length > 0) {
    // Use IntersectionObserver for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetWidth = el.getAttribute("data-width") + "%";
            setTimeout(() => {
              el.style.width = targetWidth;
            }, 200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    skillFills.forEach((fill) => observer.observe(fill));
  }

  // ============================
  //  VALIDASI FORM KONTAK
  // ============================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput  = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError  = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const formStatus = document.getElementById("formStatus");

    // Live validation — clear error on input
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim()) {
        nameError.textContent = "";
        nameInput.classList.remove("error");
      }
    });

    emailInput.addEventListener("input", () => {
      if (emailInput.value.trim()) {
        emailError.textContent = "";
        emailInput.classList.remove("error");
      }
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      // Reset
      nameError.textContent  = "";
      emailError.textContent = "";
      nameInput.classList.remove("error");
      emailInput.classList.remove("error");

      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = "⚠ Nama tidak boleh kosong!";
        nameInput.classList.add("error");
        valid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = "⚠ Email tidak boleh kosong!";
        emailInput.classList.add("error");
        valid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "⚠ Format email tidak valid.";
        emailInput.classList.add("error");
        valid = false;
      }

      if (valid) {
        formStatus.innerHTML = `<span class="status-ok">✅ Pesan berhasil dikirim! Terima kasih, <strong>${nameInput.value}</strong> 🌸</span>`;
        contactForm.reset();
        setTimeout(() => { formStatus.innerHTML = ""; }, 4000);
      } else {
        formStatus.innerHTML = `<span class="status-err">⚠ Mohon lengkapi semua field yang wajib diisi.</span>`;
      }
    });
  }
});
