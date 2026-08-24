export function initReveal() {
    // Tự động chọn tất cả các thẻ section, card, list-item, form,... trên trang
    const selector = "section, main > section > div, .grid > div, .grid > li, form, figure";
    const items = document.querySelectorAll(selector);
  
    if (!items.length) return;
  
    // Tôn trọng cài đặt giảm chuyển động của hệ điều hành
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("opacity-100"));
      return;
    }
  
    // Thiết lập trạng thái ban đầu: Ẩn, trượt xuống 60px và thu nhỏ nhẹ (scale 95%)
    items.forEach((el) => {
      el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      el.classList.add("opacity-0", "translate-y-16", "scale-95");
    });
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi cuộn tới: Hiện rõ, trượt về vị trí cũ và phóng to 100%
            entry.target.classList.remove("opacity-0", "translate-y-16", "scale-95");
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            obs.unobserve(entry.target); // Hủy theo dõi sau khi xuất hiện
          }
        });
      },
      { threshold: 0.1 }
    );
  
    items.forEach((el) => observer.observe(el));
  }