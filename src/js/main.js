import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";

// Import thêm state, render và bindEvents theo mô hình State -> Render
import { state } from "./state.js";
import { render } from "./render.js";
import { bindEvents } from "./events.js";

// 1. Điểm khởi động các hiệu ứng UI giao diện cố định
initNav();
initHeaderOnScroll();
initToTop();
initTheme();
initFaq();
initPricing();
initSlider();
initReveal();



// Dữ liệu dự phòng mặc định nếu fetch bị trình duyệt chặn (CORS/file://)
const DEFAULT_RECORDS = [
  { id: "JOB-2607-001", trader: "FPT Software", category: "con-nhieu", status: "con-trong", weight: 15, amount: 25000000, date: "2026-08-20", url: "https://fptsoftware.com" },
  { id: "JOB-2607-002", trader: "Viettel Group", category: "it-vi-tri", status: "gan-het", weight: 3, amount: 35000000, date: "2026-08-22", url: "https://viettel.vn" },
  { id: "JOB-2607-003", trader: "VNG Corporation", category: "het", status: "het-sach", weight: 0, amount: 18000000, date: "2026-08-15", url: "https://vng.com.vn" },
  { id: "JOB-2607-004", trader: "Shopee Việt Nam", category: "con-nhieu", status: "con-trong", weight: 10, amount: 28000000, date: "2026-08-24", url: "https://shopee.vn" },
  { id: "JOB-2607-005", trader: "Momo (M-Service)", category: "it-vi-tri", status: "gan-het", weight: 2, amount: 32000000, date: "2026-08-18", url: "https://momo.vn" },
  { id: "JOB-2607-006", trader: "Grab Vietnam", category: "con-nhieu", status: "con-trong", weight: 20, amount: 40000000, date: "2026-08-23", url: "https://grab.com" }
];

async function loadRecords() {
  // 1. Kiểm tra cache trong localStorage
  const cachedData = localStorage.getItem("records_data");
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      localStorage.removeItem("records_data");
    }
  }

  // 2. Thử fetch từ file JSON
  try {
    const res = await fetch("./data/records.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    localStorage.setItem("records_data", JSON.stringify(data));
    return data;
  } catch (err) {
    console.warn("Không thể fetch dữ liệu (CORS hoặc thiếu file), tự động dùng dữ liệu dự phòng:", err.message);
    // 3. Nếu fetch thất bại, tự động dùng mảng mẫu để không bị treo màn hình Loading
    localStorage.setItem("records_data", JSON.stringify(DEFAULT_RECORDS));
    return DEFAULT_RECORDS;
  }
}

async function initData() {
  bindEvents();
  render(); // Vẽ khung xương (Loading)

  try {
    state.records = await loadRecords();
  } catch (err) {
    state.error = `Không tải được dữ liệu: ${err.message}`;
  } finally {
    state.loading = false; // Bắt buộc tắt loading
    render(); // Hiển thị dữ liệu lên bảng
  }
}

initData();