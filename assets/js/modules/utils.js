const getParamFormUrl = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// ฟังก์ชันสำหรับดึง path จาก URL
const getPathFromURL = () => {
  return window.location.pathname;
};

// ฟังก์ชันสำหรับแยก path เป็นส่วน ๆ
const splitPathSegments = (path) => {
  return path.split("/").filter((segment) => segment);
};

// ฟังก์ชันสำหรับอัปเดต active class ใน Navbar
const updateActiveNavLink = () => {
  const path = getPathFromURL().replace(/\/$/, ""); // ลบ trailing slash
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/$/, ""); // ลบ trailing slash
    if (path === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

/* ฟังก์ชันตัดตัวอักษร
 * เช่น "digital Hub" => "Digital Hub"
 */
const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/* ฟังก์ชันแยก key-value ใน description Github
 * เช่น "name:Digital Hub | image:https://placehold.co/300x200"
 */
const parseDescription = (description) =>
  description
    .split("|")
    .map((item) => item.trim())
    .reduce((acc, pair) => {
      const index = pair.indexOf(":");
      if (index !== -1) {
        const key = pair.substring(0, index).trim().toLowerCase();
        const value = pair.substring(index + 1).trim();
        acc[key] = value;
      }
      return acc;
    }, {});

// ตรวจสอบว่าเป็น local environment หรือไม่
const isLocalEnvironment = () => {
  const hostname = window.location.hostname;
  return (
    hostname === "localhost" || // localhost
    hostname === "127.0.0.1" || // local IPv4
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) || // private IPv4 range 192.168.x.x
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) || // private IPv4 range 10.x.x.x
    hostname.endsWith(".local") // custom local domains
  );
};

// ปิดการแสดงผล console.log ถ้าไม่ใช่ local และ debug เป็น false
(function overrideConsole() {
  if (config.debug) return;
  if (!config.debug && !isLocalEnvironment()) {
    if (typeof console === "undefined") {
      console = {}; // สร้าง console object หากไม่มีใน environment
    }
    console.log = function () {}; // ปิดการแสดงผล
  }
})();
