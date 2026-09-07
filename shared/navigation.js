document.querySelectorAll(".site-nav").forEach((nav) => {
  const toggle = nav.querySelector(".site-nav-toggle");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.dataset.open === "true";
    nav.dataset.open = String(!isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});
