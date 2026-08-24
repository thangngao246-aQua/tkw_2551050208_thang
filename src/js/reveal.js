export function initReveal() {
    const items = document.querySelectorAll(".reveal-item");
    if (!items.length) return;
  
    // Tôn trọng cài đặt giảm chuyển động của hệ điều hành
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("opacity-100"));
      return;
    }
  
    items.forEach((el) => {
      el.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-8");
    });
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
            obs.unobserve(entry.target); // Hủy theo dõi khi đã xuất hiện
          }
        });
      },
      { threshold: 0.1 }
    );
  
    items.forEach((el) => observer.observe(el));
  }