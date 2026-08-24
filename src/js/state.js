export const state = {
    records: [],
    query: "",
    category: "all",
    status: "all",
    sort: "date-desc",
    loading: true,
    error: null,
    
    // Trạng thái UI cơ bản khác
    theme: localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    isNavOpen: false,
    pricingPeriod: "monthly",
    activeFaqIndex: null
  };