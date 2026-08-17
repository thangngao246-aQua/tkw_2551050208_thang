/* Tính năng 1 – Menu mobile (Tương thích HTML cũ) */
export function initNav() {
    const toggle = document.querySelector('[aria-controls="nav-mobile"]');
    const menu = document.getElementById("nav-mobile");
    if (!toggle || !menu) return;
  
    // Hàm duy nhất thay đổi trạng thái
    function setOpen(open) {
      menu.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      document.body.classList.toggle("overflow-hidden", open);
    }
  
    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  
    // Sự kiện Click
    toggle.addEventListener("click", () => {
      setOpen(!isOpen());
    });
  
    // Đóng bằng phím ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
  
    // Đóng khi click ra ngoài header
    document.addEventListener("click", (e) => {
      if (isOpen() && !e.target.closest("header")) {
        setOpen(false);
      }
    });
  
    // Đóng khi mở rộng màn hình lên Desktop (>= 1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", (e) => {
      if (e.matches && isOpen()) {
        setOpen(false);
      }
    });
  }