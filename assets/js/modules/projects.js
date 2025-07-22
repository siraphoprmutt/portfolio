const transformProjectData = async (project) => {
  const repoOwner = config.repoOwner;
  const metaTag = project.topics.includes("meta");
  let meta = null;

  if (metaTag) {
    const metaUrl = project.topics.includes("main")
      ? `https://${repoOwner}.github.io/meta.json`
      : `https://${repoOwner}.github.io/${project.name}/meta.json`;

    meta = await fetchMetaRepo(metaUrl);
    if (meta) {
      meta.imageUrl = project.topics.includes("main")
        ? `https://${repoOwner}.github.io/${meta.banner}`
        : `https://${repoOwner}.github.io/${project.name}/${meta.banner}`;
    }
  }

  const pageUrl = project.has_pages
    ? `https://${repoOwner}.github.io/${project.name}/`
    : null;
  const repoUrl = `https://github.com/${repoOwner}/${project.name}`;

  return {
    imageUrl: meta?.imageUrl || "./assets/images/placeholder/300x200.png",
    name: meta?.name || project.name.toUpperCase(),
    author: project.owner?.login || "Unknown",
    stars: project.stargazers_count || 0,
    updatedAt: new Date(project.updated_at).toLocaleDateString(),
    repoUrl,
    pageUrl,
    description: meta?.description || "No description available",
    badge: {
      text: project.topics.includes("pages") ? "Pages" : "Repo",
      color: project.topics.includes("pages") ? "primary" : "secondary",
    },
    hide: meta?.hide || false,
  };
};


const filterProjectsByType = (projects, type) => {
  return projects.filter((project) => {
    if (project.hide) return false;
    if (type === "repo") return project.badge.text === "Repo";
    if (type === "pages") return project.badge.text === "Pages";
    return true;
  });
};

// ฟังก์ชันแสดงผลโปรเจกต์
const displayProjects = async (projects, activeType = "all") => {
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;

  const transformedProjects = await Promise.all(
    projects.map(transformProjectData)
  );
  const filteredProjects = filterProjectsByType(
    transformedProjects,
    activeType
  );

  if (filteredProjects.length === 0) {
    projectsContainer.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projectsContainer.innerHTML = `
    ${renderProjectFilter(activeType)}
    <div class="row fade-in">
      ${filteredProjects.map(renderProjectCard).join("")}
    </div>
  `;
};

const filterProjects = async (type, element) => {
  const projects = await fetchProjects();
  displayProjects(projects, type);

  document.querySelectorAll(".text-center button").forEach((btn) => {
    btn.classList.remove(
      "active",
      "btn-primary",
      "btn-secondary",
      "btn-success"
    );
  });

  element.classList.add(
    type === "pages" ? "btn-success" : "btn-secondary",
    "active"
  );
};

// เรียกใช้งานเมื่อหน้าเว็บโหลด
(async () => {
  const projects = await fetchProjects();
  displayProjects(projects);
})();
