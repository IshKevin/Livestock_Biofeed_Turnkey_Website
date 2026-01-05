
function waLink() {
  const num = (window.LB_CONFIG && window.LB_CONFIG.whatsapp_number_international) ? window.LB_CONFIG.whatsapp_number_international : "";
  if (!num) return "#";
  return `https://wa.me/${num}`;
}

window.addEventListener("DOMContentLoaded", () => {
  // set social links
  const s = (window.LB_CONFIG && window.LB_CONFIG.socials) ? window.LB_CONFIG.socials : {};
  const map = {
    ig: s.instagram, fb: s.facebook, ln: s.linkedin, yt: s.youtube
  };
  Object.entries(map).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
  });

  // whatsapp floating
  const wa = document.getElementById("waBtn");
  if (wa) wa.href = waLink();

  // catalog link
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
