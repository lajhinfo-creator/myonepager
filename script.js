// ==============================
// SCROLL REVEAL FOR SECTIONS
// ==============================
function handleReveal() {
  const sections = document.querySelectorAll(".section.reveal");
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
// FOOTER ZOOM + PARALLAX REVEAL
// ==============================
function handleFooterZoomParallax() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const rect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // How much of the footer is visible (0 = not visible, 1 = fully visible)
  const visible = Math.min(windowHeight, Math.max(0, windowHeight - rect.top));
  const maxVisible = Math.min(windowHeight, rect.height || footer.offsetHeight);
  let progress = maxVisible > 0 ? visible / maxVisible : 0;

  // Clamp 0–1
  progress = Math.max(0, Math.min(progress, 1));

  // Dramatic zoom-out: 130% -> 100%
  const startZoom = 80;
  const endZoom = 75;
  const currentZoom = startZoom - (startZoom - endZoom) * progress;

  // Pan upward: 90% -> 50% (reveals full image)
  const startPos = 90;
  const endPos = 50;
  const currentPos = startPos - (startPos - endPos) * progress;

  footer.style.backgroundSize = `${currentZoom}% auto`;
  footer.style.backgroundPosition = `center ${currentPos}%`;
}

// ==============================
// MOBILE-SAFE FADE FOR HEADER & FOOTER
// ==============================
function handleMobileFade() {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isMobile || prefersReducedMotion) return;

  const headerOverlay = document.querySelector(".header-overlay");
  const footerOverlay = document.querySelector(".footer-overlay");
  const footer = document.querySelector(".footer");
  if (!headerOverlay || !footerOverlay || !footer) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;

  // HEADER FADE: as you scroll down ~300px, tint fades out slightly
  const headerFadeRange = 300;
  let headerProgress = Math.min(Math.max(scrollY / headerFadeRange, 0), 1);
  const headerStartOpacity = 7;
  const headerEndOpacity = 2;
  const headerOpacity =
    headerStartOpacity - (headerStartOpacity - headerEndOpacity) * headerProgress;
  headerOverlay.style.opacity = headerOpacity.toFixed(3);

  // FOOTER FADE: as footer comes into view, tint increases to focus text
  const rect = footer.getBoundingClientRect();
  const visible = Math.min(windowHeight, Math.max(0, windowHeight - rect.top));
  const maxVisible = Math.min(windowHeight, rect.height || footer.offsetHeight);
  let footerProgress = maxVisible > 0 ? visible / maxVisible : 0;
  footerProgress = Math.max(0, Math.min(footerProgress, 1));

  const footerStartOpacity = 0.2;
  const footerEndOpacity = 0.65;
  const footerOpacity =
    footerStartOpacity + (footerEndOpacity - footerStartOpacity) * footerProgress;
  footerOverlay.style.opacity = footerOpacity.toFixed(3);
}

// ==============================
// DOWNLOAD PDF BUTTON
// ==============================
function setupDownloadButton() {
  const btn = document.getElementById("downloadPDF");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const pdfUrl =
      "https://raw.githubusercontent.com/lajhinfo-creator/One-Pager-Presentation/main/Lorne%20Hopkins%20-%201%20pager%20Presentation.pdf";

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Lorne Hopkins - 1 Pager Presentation.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ==============================
// EVENT HOOKUP
// ==============================
function onScroll() {
  handleReveal();
  handleFooterZoomParallax();
  handleMobileFade();
}

window.addEventListener("scroll", onScroll);

window.addEventListener("load", () => {
  setupDownloadButton();
  handleReveal();
  handleFooterZoomParallax();
  handleMobileFade();
});

document.addEventListener("DOMContentLoaded", () => {
  setupDownloadButton();
  handleReveal();
  handleFooterZoomParallax();
  handleMobileFade();
});
