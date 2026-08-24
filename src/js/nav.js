// Mobile menu chuẩn tiếp cận ARIA và 3 cách đóng
export function initNav() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);
  }

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // 1. Phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // 2. Click ra ngoài
  document.addEventListener("click", (e) => {
    if (isOpen() && !e.target.closest("header")) {
      setOpen(false);
    }
  });

  // 3. Phóng lớn màn hình lên Desktop
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", (e) => {
    if (e.matches && isOpen()) setOpen(false);
  });
}

// Navbar khi cuộn dùng IntersectionObserver
export function initHeaderOnScroll() {
  const header = document.getElementById("site-header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(([entry]) => {
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-sm", scrolled);
  });
  observer.observe(sentinel);
}

// Nút Lên đầu trang khi cuộn > 400px
export function initToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("hidden", window.scrollY <= 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}