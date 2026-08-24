import { state } from "./state.js";

// 1. Hàm chống XSS bằng Template & textContent
export function buildRow(record) {
  const template = document.getElementById("row-template");
  const row = template.content.firstElementChild.cloneNode(true);

  row.querySelector("[data-cell='trader']").textContent = record.trader;
  row.querySelector("[data-cell='category']").textContent = record.category;
  row.querySelector("[data-cell='status']").textContent = record.status;
  row.querySelector("[data-cell='date']").textContent = record.date;
  
  const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  row.querySelector("[data-cell='amount']").textContent = formatter.format(record.amount);

  return row;
}

// 2. Debounce tối ưu hiệu năng ô tìm kiếm
export function debounce(fn, delay = 300) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

// 3. Bảng tra Sorters & Hàm lọc thuần
export const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
};

export function visibleRecords() {
  const q = state.query.trim().toLowerCase();
  return state.records
    .filter((r) => state.category === "all" || r.category === state.category)
    .filter((r) => state.status === "all" || r.status === state.status)
    .filter((r) => !q || r.trader.toLowerCase().includes(q))
    .sort(sorters[state.sort] || sorters["date-desc"]);
}