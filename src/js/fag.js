export function initFaq() {
  const faqContainer = document.getElementById("faq");
  if (!faqContainer) return;

  // Gắn 1 listener duy nhất tại thẻ cha (Event Delegation)
  faqContainer.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const content = trigger.nextElementSibling;
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";

    // Đóng tất cả các câu hỏi khác
    const allTriggers = faqContainer.querySelectorAll("[data-faq-trigger]");
    allTriggers.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling?.classList.add("hidden");
    });

    // Mở câu hỏi hiện tại nếu chưa mở
    if (!isExpanded && content) {
      trigger.setAttribute("aria-expanded", "true");
      content.classList.remove("hidden");
    }
  });
}