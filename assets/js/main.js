
function waLink() {
  const num =
    window.LB_CONFIG && window.LB_CONFIG.whatsapp_number_international
      ? window.LB_CONFIG.whatsapp_number_international
      : "";
  if (!num) return "#";
  return `https://wa.me/${num}`;
}

function setLinkOrDisable(el, url) {
  if (!el) return;
  if (!url || url.trim() === "") {
    el.classList.add("disabled-link");
    el.removeAttribute("href");
    el.setAttribute("title", "Coming soon");
  } else {
    el.href = url;
    el.classList.remove("disabled-link");
    el.removeAttribute("title");
  }
}

// Global UI State & Helpers
window.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  
  function toggleMobileMenu() {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("show", !isExpanded);
    document.body.style.overflow = !isExpanded ? "hidden" : "";
  }

  function closeMobileMenu() {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeMobileMenu();
    });
  }

  // Language buttons sync (delegates to i18n.js setLang if available)
  const langBtns = [document.getElementById("langBtn"), document.getElementById("mobileLangBtn")];
  langBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        if (typeof window.toggleLang === "function") {
          window.toggleLang();
        } else {
          // Fallback if i18n.js is not loaded
          const currentLang = document.documentElement.lang || "en";
          const newLang = currentLang === "en" ? "fr" : "en";
          document.documentElement.lang = newLang;
          btn.textContent = newLang.toUpperCase();
        }
      });
    }
  });

  // Social links & WhatsApp
  const s = window.LB_CONFIG && window.LB_CONFIG.socials ? window.LB_CONFIG.socials : {};
  setLinkOrDisable(document.getElementById("ig"), s.instagram);
  setLinkOrDisable(document.getElementById("fb"), s.facebook);
  setLinkOrDisable(document.getElementById("ln"), s.linkedin);
  setLinkOrDisable(document.getElementById("yt"), s.youtube);

  const wa = document.getElementById("waBtn");
  if (wa) wa.href = waLink();

  const cat = document.getElementById("catalogBtn") || document.getElementById("mobileCatalogBtn");
  if (cat && window.LB_CONFIG && window.LB_CONFIG.catalog_pdf_url) {
    cat.href = window.LB_CONFIG.catalog_pdf_url;
  }

  // Contact form handler
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const to = window.LB_CONFIG && window.LB_CONFIG.email_to ? window.LB_CONFIG.email_to : "";
      const data = new FormData(form);
      const body = [
        `Name: ${data.get("name")}`,
        `Company: ${data.get("company")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        "",
        data.get("message"),
      ].join("\n");
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card, .feature-card, .product-card").forEach((el) => {
    observer.observe(el);
  });
});

