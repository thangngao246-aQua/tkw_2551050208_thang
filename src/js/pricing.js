document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('pricing-toggle'); //[cite: 1]
  if (!toggleBtn) return; //[cite: 1]

  const priceElements = document.querySelectorAll('[data-price]'); //[cite: 1]
  const monthlySpan = toggleBtn.children[0]; //[cite: 1]
  const yearlySpan = toggleBtn.children[1]; //[cite: 1]

  let isYearly = false; //[cite: 1]

  toggleBtn.addEventListener('click', () => { //[cite: 1]
    isYearly = !isYearly; //[cite: 1]
    toggleBtn.setAttribute('aria-checked', isYearly); //[cite: 1]

    // Cập nhật giao diện nút Toggle
    if (isYearly) {
      monthlySpan.className = 'px-3 py-1 text-slate-500'; //[cite: 1]
      yearlySpan.className = 'px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow text-purple-600 dark:text-purple-400 font-bold'; //[cite: 1]
    } else {
      monthlySpan.className = 'px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow font-bold'; //[cite: 1]
      yearlySpan.className = 'px-3 py-1 text-slate-500'; //[cite: 1]
    }

    // Cập nhật giá tiền và đơn vị hiển thị
    priceElements.forEach(el => { //[cite: 1]
      const monthlyPrice = Number(el.dataset.monthly); //[cite: 1]
      
      // Công thức: (Giá tháng * 12) giảm 20% (nhân với 0.8)
      const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); //[cite: 1]

      const price = isYearly ? yearlyPrice : monthlyPrice; //[cite: 1]
      const periodText = el.nextElementSibling; //[cite: 1]

      // Định dạng số tiền hiển thị theo chuẩn Việt Nam
      el.textContent = `${Number(price).toLocaleString('vi-VN')} ₫`; //[cite: 1]

      if (periodText) { //[cite: 1]
        periodText.textContent = isYearly ? '/năm' : '/tháng'; //[cite: 1]
      }
    });
  });
});