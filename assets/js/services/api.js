const fetchRepos = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch repositories");
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
};

const fetchProjects = async (sync = false) => {
  try {
    const apiUrl = config.apiRepoUrl;
    const cachedData = localStorage.getItem("reposData");

    if (cachedData && !sync) {
      return JSON.parse(cachedData);
    }

    console.log("Fetching projects...");
    const projects = await fetchRepos(apiUrl);
    localStorage.setItem("reposData", JSON.stringify(projects));
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

const fetchMetaRepo = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Warning: meta.json not found at ${url}`);
        return null;
      }
      throw new Error("Failed to fetch metadata repository");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
};
