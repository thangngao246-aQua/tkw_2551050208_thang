import { state } from "./state.js";
import { visibleRecords } from "./helpers.js";

// Bảng ánh xạ giá trị hiển thị tiếng Việt chuẩn giao diện
const categoryMap = {
  "con-nhieu": "Còn nhiều vị trí",
  "it-vi-tri": "Ít vị trí",
  "het": "Hết vị trí"
};

const statusMap = {
  "con-trong": "Còn trống",
  "gan-het": "Gần hết",
  "het-sach": "Hết sạch"
};

// Hàm dựng 1 dòng HTML từ <template> (An toàn chống XSS)
function buildRow(record) {
  const template = document.getElementById("row-template");
  if (!template) return document.createElement("tr");

  const row = template.content.firstElementChild.cloneNode(true);

  // Gán dữ liệu bằng textContent
  const elId = row.querySelector("[data-cell='id']");
  const elTrader = row.querySelector("[data-cell='trader']");
  const elCategory = row.querySelector("[data-cell='category']");
  const elWeight = row.querySelector("[data-cell='weight']");
  const elAmount = row.querySelector("[data-cell='amount']");
  const elDate = row.querySelector("[data-cell='date']");
  const elStatus = row.querySelector("[data-cell='status']");
  const elLink = row.querySelector("[data-cell='link']");
  const btnDelete = row.querySelector("[data-action='delete']");

  if (elId) elId.textContent = record.id || "N/A";
  if (elTrader) elTrader.textContent = record.trader || "Chưa cập nhật";
  if (elCategory) elCategory.textContent = categoryMap[record.category] || record.category || "Khác";
  if (elWeight) elWeight.textContent = `${record.weight ?? 0} vị trí`;
  if (elAmount) elAmount.textContent = `${Number(record.amount || 0).toLocaleString("vi-VN")} ₫`;
  if (elDate) elDate.textContent = record.date || "";
  if (elStatus) elStatus.textContent = statusMap[record.status] || record.status || "Chưa rõ";

  // Gán đường dẫn ứng tuyển
  if (elLink) {
    elLink.href = record.url || `https://www.google.com/search?q=${encodeURIComponent(record.trader || "tuyendung")}`;
  }

  // Sự kiện nút Xóa bản ghi
  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      state.records = state.records.filter((r) => r.id !== record.id);
      localStorage.setItem("records_data", JSON.stringify(state.records));
      render();
    });
  }

  return row;
}

// Hàm render chính xử lý đủ 4 trạng thái UI
export function render() {
  // 1. Đồng bộ Theme Dark/Light
  if (state.theme) {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }

  // 2. Lấy các phần tử từ DOM
  const tbody = document.getElementById("record-body");
  const tableWrapper = document.getElementById("record-table-wrapper");
  const loading = document.getElementById("state-loading");
  const error = document.getElementById("state-error");
  const empty = document.getElementById("state-empty");

  if (!tbody) return;

  // 3. Ẩn tất cả khối trạng thái ban đầu
  if (loading) loading.classList.add("hidden");
  if (error) error.classList.add("hidden");
  if (empty) empty.classList.add("hidden");
  if (tableWrapper) tableWrapper.classList.add("hidden");

  // 4. Xử lý logic 4 trạng thái
  if (state.loading) {
    // Trạng thái 1: Đang tải
    if (loading) loading.classList.remove("hidden");
    tbody.replaceChildren();
  } else if (state.error) {
    // Trạng thái 2: Lỗi fetch
    if (error) {
      error.textContent = state.error;
      error.classList.remove("hidden");
    }
    tbody.replaceChildren();
  } else {
    // Trạng thái 3 & 4: An toàn lấy dữ liệu danh sách
    let list = [];
    try {
      if (typeof visibleRecords === "function") {
        list = visibleRecords();
      } else {
        list = state.records || [];
      }
    } catch (e) {
      console.warn("Lỗi khi lọc dữ liệu qua visibleRecords(), tự động dùng dữ liệu gốc:", e);
      list = state.records || [];
    }

    if (!Array.isArray(list) || list.length === 0) {
      // Trạng thái 3: Rỗng
      if (empty) empty.classList.remove("hidden");
      tbody.replaceChildren();
    } else {
      // Trạng thái 4: Có dữ liệu
      if (tableWrapper) tableWrapper.classList.remove("hidden");
      tbody.replaceChildren(...list.map(buildRow));
    }
  }
}