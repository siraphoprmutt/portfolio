const headerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">
      <img src="./assets/images/logo.png" alt="Profile Picture" class="img-fluid rounded-circle me-2" width="30" height="30">
        Siraphop's Portfolio
      </a>
    </div>
  </nav>
`;

const footerHTML = `
  <footer class="bg-dark text-white text-center py-4">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Siraphop Nonpala. All rights reserved.</p>
    </div>
  </footer>
`;

const updateUIHeaderAndFooter = () => {
  document.getElementById("header").innerHTML = headerHTML;
  document.getElementById("footer").innerHTML = footerHTML;
};

updateUIHeaderAndFooter();
