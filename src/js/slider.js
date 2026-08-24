export function initSlider() {
    const root = document.getElementById("slider-root");
    const track = document.getElementById("slider-track");
    if (!root || !track) return;
  
    const slides = Array.from(track.children);
    const dotsContainer = document.getElementById("slider-dots");
    let index = 0;
    let timer = null;
  
    if (slides.length === 0) return;
  
    // Sinh chấm chỉ dẫn từ số slide thật
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `w-3 h-3 rounded-full transition-colors ${i === 0 ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700"}`;
        dot.setAttribute("aria-label", `Chuyển tới slide ${i + 1}`);
        dot.addEventListener("click", () => go(i));
        dotsContainer.appendChild(dot);
      });
    }
  
    function go(next) {
      // Công thức tính index xoay vòng tròn cả hai chiều
      index = (next + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
  
      // Quản lý thuộc tính inert bảo vệ bàn phím
      slides.forEach((s, i) => {
        s.toggleAttribute("inert", i !== index);
      });
  
      if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((dot, i) => {
          dot.className = `w-3 h-3 rounded-full transition-colors ${i === index ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700"}`;
        });
      }
    }
  
    function start() {
      stop();
      timer = setInterval(() => go(index + 1), 4000);
    }
  
    function stop() {
      if (timer) clearInterval(timer);
    }
  
    // Tự dừng khi tương tác hoặc khi tab bị ẩn
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  
    go(0);
    start();
  }