const config = Object.freeze({
  debug: true,
  repoOwner: "siraphoprmutt",
  get apiRepoUrl() {
    return `https://api.github.com/users/${this.repoOwner}/repos`;
  },
});
