export function initPricing() {
  const toggleBtn = document.getElementById("pricing-toggle");
  if (!toggleBtn) return;

  const priceElements = document.querySelectorAll("[data-price]");
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  toggleBtn.addEventListener("click", () => {
    const isYearly = toggleBtn.getAttribute("aria-checked") !== "true";
    toggleBtn.setAttribute("aria-checked", String(isYearly));

    // Đổi giao diện giao diện công tắc
    const [monthlyLabel, yearlyLabel] = toggleBtn.querySelectorAll("span");
    if (monthlyLabel && yearlyLabel) {
      if (isYearly) {
        monthlyLabel.className = "px-3 py-1 text-slate-500";
        yearlyLabel.className = "px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow text-purple-600 dark:text-purple-400 font-bold";
      } else {
        monthlyLabel.className = "px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow font-bold";
        yearlyLabel.className = "px-3 py-1 text-slate-500";
      }
    }

    // Đổi giá tiền và đơn vị
    priceElements.forEach((el) => {
      const val = isYearly ? el.dataset.yearly : el.dataset.monthly;
      if (val) {
        el.textContent = formatter.format(Number(val));
      }

      const periodText = el.nextElementSibling;
      if (periodText) {
        periodText.textContent = isYearly ? "/năm" : "/tháng";
      }
    });
  });
}