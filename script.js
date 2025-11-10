// Scroll reveal for sections
function handleReveal() {
  const sections = document.querySelectorAll(".section.reveal");
  const windowHeight = window.innerHeight;
  const offset = 120;
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < windowHeight - offset) section.classList.add("visible");
  });
}
window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadPDF");
  if (btn) btn.addEventListener("click", () => window.print());
});
