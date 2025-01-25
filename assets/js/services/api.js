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
