//main.js

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll("nav .nav-link");
  const indicator = document.querySelector(".nav-indicator");

  // Ubah warna navbar saat scroll
  window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 50 ? "#0d4a17" : "var(--primary)";
  });

  // Fungsi update posisi underline indikator
  function updateIndicator(activeLink) {
    const rect = activeLink.getBoundingClientRect();
    const navRect = activeLink.parentElement.getBoundingClientRect();
    const left = rect.left - navRect.left;
    const width = rect.width;
    document.documentElement.style.setProperty("--underline-left", `${left}px`);
    document.documentElement.style.setProperty("--underline-width", `${width}px`);
  }

  // Saat halaman load, tampilkan indikator di link aktif
  const activeLink = document.querySelector("nav .nav-link.active");
  if (activeLink) {
    updateIndicator(activeLink);
    activeLink.parentElement.classList.add("ready");
  }

  // Pindah halaman tanpa efek fade putih, tapi tetap animasi underline halus
  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.includes("#") && !href.startsWith("http")) {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        updateIndicator(link);
        // langsung navigasi tanpa efek fade
        window.location.href = href;
      }
    });
  });
});
