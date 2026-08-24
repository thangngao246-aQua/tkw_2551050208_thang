export function initPricing() {
  const toggleBtn = document.getElementById("pricing-toggle");
  if (!toggleBtn) return;

  const priceElements = document.querySelectorAll("[data-price]");

  toggleBtn.addEventListener("click", () => {
    const isYearly = toggleBtn.getAttribute("aria-checked") !== "true";
    toggleBtn.setAttribute("aria-checked", String(isYearly));

    // 1. Đổi giao diện công tắc
    const [monthlyLabel, yearlyLabel] = toggleBtn.querySelectorAll("span");
    if (monthlyLabel && yearlyLabel) {
      if (isYearly) {
        monthlyLabel.className = "px-3 py-1 text-slate-500 cursor-pointer";
        yearlyLabel.className = "px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow text-purple-600 dark:text-purple-400 font-bold cursor-pointer";
      } else {
        monthlyLabel.className = "px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow font-bold cursor-pointer";
        yearlyLabel.className = "px-3 py-1 text-slate-500 cursor-pointer";
      }
    }

    // 2. Đổi giá tiền & đơn vị hiển thị
    priceElements.forEach((el) => {
      const val = isYearly ? el.dataset.yearly : el.dataset.monthly;
      if (val) {
        // Định dạng phân cách hàng nghìn chuẩn vi-VN và gắn thêm ₫
        el.textContent = `${Number(val).toLocaleString("vi-VN")} ₫`;
      }

      const periodText = el.nextElementSibling;
      if (periodText) {
        periodText.textContent = isYearly ? "/năm" : "/tháng";
      }
    });
  });
}

// Tự động kích hoạt hàm khi cây DOM đã sẵn sàng
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPricing);
} else {
  initPricing();
}