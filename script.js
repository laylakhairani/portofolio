// ======================== DARK MODE TOGGLE + LOCALSTORAGE ========================
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi dark mode
  const darkToggle = document.getElementById("darkModeToggle");
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.textContent = "☀️ Light";
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDarkMode = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDarkMode);
      darkToggle.textContent = isDarkMode ? "☀️ Light" : "🌙 Dark";
    });
  }

  // ======================== NAVBAR ACTIVE STATE (Event listener + highlight) ========================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
    // Event listener tambahan untuk interaksi modern (console atau efek)
    link.addEventListener("click", (e) => {
      // hanya efek tambahan, navigasi tetap berjalan
      console.log(`Navigasi menuju: ${href}`);
    });
  });

  // ======================== FITUR "TAMPILKAN LEBIH BANYAK" (Halaman Profil) ========================
  const readMoreBtn = document.getElementById("readMoreBtn");
  const extraDesc = document.getElementById("extraDesc");
  if (readMoreBtn && extraDesc) {
    readMoreBtn.addEventListener("click", () => {
      const isHidden = extraDesc.classList.contains("hidden");
      if (isHidden) {
        extraDesc.classList.remove("hidden");
        extraDesc.classList.add("show");
        readMoreBtn.textContent = "📖 Tampilkan Lebih Sedikit";
      } else {
        extraDesc.classList.add("hidden");
        extraDesc.classList.remove("show");
        readMoreBtn.textContent = "📖 Tampilkan Lebih Banyak";
      }
    });
  }

  // ======================== VALIDASI FORM KONTAK ========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      let isValid = true;

      // Reset error
      nameError.textContent = "";
      emailError.textContent = "";

      if (!name.value.trim()) {
        nameError.textContent = "Nama tidak boleh kosong!";
        name.style.borderColor = "#ef4444";
        isValid = false;
      } else {
        name.style.borderColor = "";
      }

      if (!email.value.trim()) {
        emailError.textContent = "Email tidak boleh kosong!";
        email.style.borderColor = "#ef4444";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        emailError.textContent = "Format email tidak valid.";
        email.style.borderColor = "#ef4444";
        isValid = false;
      } else {
        email.style.borderColor = "";
      }

      if (isValid) {
        alert(
          `✅ Pesan berhasil dikirim! Terima kasih ${name.value}, saya akan segera merespon.`,
        );
        contactForm.reset();
        document.getElementById("formStatus").innerHTML =
          '<span style="color: green;">✨ Pesan terkirim (simulasi).</span>';
        setTimeout(() => {
          document.getElementById("formStatus").innerHTML = "";
        }, 3000);
      } else {
        document.getElementById("formStatus").innerHTML =
          '<span style="color: #ef4444;">⚠️ Mohon lengkapi data yang diperlukan.</span>';
      }
    });
  }
});
