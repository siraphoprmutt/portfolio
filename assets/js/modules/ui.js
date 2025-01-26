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

const renderProjectCard = (item) => {
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      <div class="project-card bg-white rounded-4 shadow-sm h-100 position-relative">
        <span class="badge bg-${item.badge.color}">${item.badge.text}</span>
        <div class="overflow-hidden fixed-image-container">
          <img src="${
            item.imageUrl
          }" class="fixed-size-img card-img-top" alt="${item.name}" />
        </div>
        <div class="card-body p-2 d-flex flex-column">
          <div>
            <h5 class="card-title text-primary fw-bold">${item.name}</h5>
            <p class="card-text text-muted">${item.description}</p>
          </div>
          <a href="${item.repoUrl}" target="${item.page ? "_self" : "_blank"}"
             class="btn btn-outline-primary w-100 mt-auto">
            View Project
          </a>
        </div>
      </div>
    </div>
  `;
};

const renderProjectFilter = (activeType) => {
  return `
    <div class="text-center mb-4 col-12">
      <button class="btn ${
        activeType === "all" ? "btn-primary active" : "btn-outline-primary"
      }" onclick="filterProjects('all', this)">
        <i class="fas fa-globe"></i> All
      </button>
      <button class="btn ${
        activeType === "repo" ? "btn-secondary active" : "btn-outline-secondary"
      }" onclick="filterProjects('repo', this)">
        <i class="fas fa-code"></i> Repo
      </button>
      <button class="btn ${
        activeType === "pages" ? "btn-success active" : "btn-outline-success"
      }" onclick="filterProjects('pages', this)">
        <i class="fas fa-globe"></i> Pages
      </button>
    </div>
  `;
};
