import { state } from "./state.js";
import { render } from "./render.js";

export function bindEvents() {
  // Tìm kiếm theo từ khóa
  document.getElementById("search-input")?.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  // Bộ lọc Danh mục
  document.getElementById("category-select")?.addEventListener("change", (e) => {
    state.category = e.target.value;
    render();
  });

  // Bộ lọc Trạng thái
  document.getElementById("status-select")?.addEventListener("change", (e) => {
    state.status = e.target.value;
    render();
  });

  // Sắp xếp
  document.getElementById("sort-select")?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  // Theme Toggle
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", state.theme);
    render();
  });

  // FAQ Accordion Toggle
  const faqContainer = document.getElementById("faq");
  faqContainer?.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;
    const triggers = Array.from(faqContainer.querySelectorAll("[data-faq-trigger]"));
    const idx = triggers.indexOf(trigger);
    state.activeFaqIndex = state.activeFaqIndex === idx ? null : idx;
    render();
  });
}