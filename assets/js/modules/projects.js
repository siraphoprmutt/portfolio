// เก็บจำนวนโปรเจกต์ทั้งหมดแบบคงที่
let projectCounts = { all: 0, repo: 0, pages: 0 };

// ฟังก์ชันสำหรับนับจำนวนโปรเจกต์ทั้งหมด
const countProjects = (projects) => {
  projectCounts = {
    all: projects.length,
    repo: projects.filter((project) => !project.topics.includes("pages"))
      .length,
    pages: projects.filter((project) => project.topics.includes("pages"))
      .length,
  };
};

// ฟังก์ชันสำหรับดึงข้อมูลโปรเจกต์จาก JSON
const fetchProjects = async (sync = false) => {
  try {
    const apiUrl = config.apiRepoUrl;
    const reposData = localStorage.getItem("reposData");
    if (reposData && !sync) {
      return JSON.parse(reposData);
    }
    console.log("sync", sync);
    const projects = await fetchRepos(apiUrl);
    localStorage.setItem("reposData", JSON.stringify(projects));
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

const syncProjects = async () => {
  const projects = await fetchProjects(true);
  displayProjects(projects);
};

// ฟังก์ชันสำหรับแปลงข้อมูลโปรเจกต์เป็นข้อมูลที่ใช้ใน UI
const transformProjectData = (project) => {
  const repoOwner = config.repoOwner;
  const repoDescription = project.description || "No description available";
  const metadata = parseDescription(repoDescription);
  const pages = project.topics.includes("pages");
  return {
    imageUrl: metadata.image || "./assets/images/placeholder/300x200.png",
    name: metadata.name || project.name.toUpperCase(),
    author: capitalizeFirstLetter(project.owner.login),
    stars: project.stargazers_count || 0,
    updatedAt: new Date(project.updated_at).toLocaleDateString(),
    repoUrl: project.has_pages
      ? `https://${repoOwner}.github.io/${project.name}/`
      : `https://github.com/${repoOwner}/${project.name}`,
    page: project.has_pages,
    description: metadata.description || "",
    badge: {
      text: pages ? "Pages" : "Repo",
      color: pages ? "primary" : "secondary",
    },
  };
};

// ฟังก์ชันสำหรับเรนเดอร์ HTML ของโปรเจกต์
const renderProjectCard = (item) => {
  return `
    <div class="col-6 col-sx-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4">
      <div class="project-card bg-white rounded-4 shadow-sm h-100 position-relative">
        <span class="badge bg-${item.badge.color}">${item.badge.text}</span>
        <div class="overflow-hidden">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}" />
        </div>
        <div class="card-body p-2">
          <h5 class="card-title text-primary fw-bold">${item.name}</h5>
          <p class="card-text text-muted">${item.description}</p>
          <a href="${item.repoUrl}" target="${
    item.page ? "_self" : "_blank"
  }" class="btn btn-outline-primary w-100">View Project</a>
        </div>
      </div>
    </div>
  `;
};

// ฟังก์ชันสำหรับเรนเดอร์ปุ่มกรองโปรเจกต์
const renderProjectFilter = (activeType, counts) => {
  return `
    <div class="text-center mb-4">
      <button class="btn mx-2 ${
        activeType === "all" ? "btn-primary active" : "btn-outline-primary"
      }" onclick="filterProjects('all', this)">
        <i class="fas fa-globe"></i> All (${counts.all})
      </button>
      <button class="btn mx-2 ${
        activeType === "repo" ? "btn-secondary active" : "btn-outline-secondary"
      }" onclick="filterProjects('repo', this)">
        <i class="fas fa-code"></i> Repo (${counts.repo})
      </button>
      <button class="btn mx-2 ${
        activeType === "pages" ? "btn-success active" : "btn-outline-success"
      }" onclick="filterProjects('pages', this)">
        <i class="fas fa-globe"></i> Pages (${counts.pages})
      </button>
    </div>
  `;
};

const filterProjects = async (type, element) => {
  let projects = await fetchProjects();

  if (type === "repo") {
    projects = projects.filter((project) => !project.topics.includes("pages"));
  } else if (type === "pages") {
    projects = projects.filter((project) => project.topics.includes("pages"));
  }

  // อัปเดต active tab
  document.querySelectorAll(".text-center button").forEach((btn) => {
    btn.classList.remove(
      "active",
      "btn-primary",
      "btn-secondary",
      "btn-success"
    );
    btn.classList.add(
      btn.classList.contains("btn-outline-primary")
        ? "btn-outline-primary"
        : "btn-outline-secondary"
    );
  });

  element.classList.remove("btn-outline-primary", "btn-outline-secondary");
  element.classList.add(
    type === "pages" ? "btn-success" : "btn-secondary",
    "active"
  );

  displayProjects(projects, type);
};

// ฟังก์ชันหลักสำหรับสร้างการ์ดโปรเจกต์
const createProjectCard = (project) => {
  const projectData = transformProjectData(project);
  return renderProjectCard(projectData);
};

const displayProjects = (projects = [], activeType = "all") => {
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;

  if (projects.length === 0) {
    projectsContainer.innerHTML = "<p>No projects found.</p>";
    return;
  }

  // แปลงข้อมูลโปรเจกต์เป็น HTML
  const projectCards = projects.map(createProjectCard).join("");
  const projectFilter = renderProjectFilter(activeType, projectCounts);

  // แสดงข้อมูลโปรเจกต์พร้อมตัวกรอง
  projectsContainer.innerHTML = `
    ${projectFilter}
    <div class="row fade-in">
      ${projectCards}
    </div>
  `;
};
