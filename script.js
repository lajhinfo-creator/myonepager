// ==============================
// SCROLL REVEAL FOR SECTIONS
// ==============================
function handleReveal() {
  const sections = document.querySelectorAll(".section.reveal, .outcome-content.reveal");
  const windowHeight = window.innerHeight;
  const offset = 120;
  
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < windowHeight - offset) {
      section.classList.add("visible");
    }
  });
}

// ==============================
// PDF DOWNLOAD / PRINT
// ==============================
function setupPrintButton() {
  const btn = document.getElementById("downloadPDF");
  if (!btn) return;
  
  btn.addEventListener("click", () => {
    // Trigger browser print dialog
    // The @media print CSS ensures proper centering and one-page layout
    window.print();
  });
}

// ==============================
// EVENT HOOKUP
// ==============================
function onScroll() {
  handleReveal();
}

// Initialize on page load
window.addEventListener("scroll", onScroll);
window.addEventListener("load", () => {
  setupPrintButton();
  handleReveal();
});

document.addEventListener("DOMContentLoaded", () => {
  setupPrintButton();
  handleReveal();
});
