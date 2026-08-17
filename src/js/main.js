import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initFaq();
  initPricing();
});