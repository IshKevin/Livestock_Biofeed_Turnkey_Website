
function waLink() {
  const num = (window.LB_CONFIG && window.LB_CONFIG.whatsapp_number_international) ? window.LB_CONFIG.whatsapp_number_international : "";
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

window.addEventListener("DOMContentLoaded", () => {
  // socials
  const s = (window.LB_CONFIG && window.LB_CONFIG.socials) ? window.LB_CONFIG.socials : {};
  setLinkOrDisable(document.getElementById("ig"), s.instagram);
  setLinkOrDisable(document.getElementById("fb"), s.facebook);
  setLinkOrDisable(document.getElementById("ln"), s.linkedin);
  setLinkOrDisable(document.getElementById("yt"), s.youtube);

  // whatsapp floating
  const wa = document.getElementById("waBtn");
  if (wa) wa.href = waLink();

  // catalog
  const cat = document.getElementById("catalogBtn");
  if (cat && window.LB_CONFIG && window.LB_CONFIG.catalog_pdf_url) {
    cat.href = window.LB_CONFIG.catalog_pdf_url;
  }

  // contact form mailto
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const to = (window.LB_CONFIG && window.LB_CONFIG.email_to) ? window.LB_CONFIG.email_to : "";
    const data = new FormData(form);
    const name = data.get("name") || "";
    const company = data.get("company") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const subject = data.get("subject") || "";
    const message = data.get("message") || "";
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message
    ].join("\n");
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
});
