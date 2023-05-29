import { DockerRegistryUIError } from './error.js';

const getRepositoryName = (split, max) => {
  let repositoryName = '';
  for (let i = 0; i < Math.min(max, split.length - 1); i++) {
    repositoryName += `${split[i]}/`;
  }
  return repositoryName;
};

const getLatestRepository = (repo, repoName) => {
  if (!repo.images) {
    return;
  }
  if (repo.repo === repoName) {
    return repo;
  }
  for (let i = 0; i < repo.images.length; i++) {
    const res = getLatestRepository(repo.images[i], repoName);
    if (res) {
      return res;
    }
  }

  if (repoName.startsWith(repo.repo)) {
    const newRepo = { repo: repoName, images: [] };
    repo.images.push(newRepo);
    return newRepo;
  }
};

export const getBranching = (min = 1, max = 1) => {
  if (min > max) {
    throw new DockerRegistryUIError(`min must be inferior to max (min: ${min} <= max: ${max})`);
  } else if (max < 0 || min < 0) {
    throw new DockerRegistryUIError(
      `min and max must be greater than equals to 0 (min: ${min} >= 0 and max: ${max} >= 0)`
    );
  }
  return (repositories) =>
    repositories.sort().reduce(function (acc, image) {
      const split = image.split('/');
      if (split.length > min && min > 0) {
        const repoName = getRepositoryName(split, max);
        let repo = acc.length > 0 && getLatestRepository(acc[acc.length - 1], repoName);
        if (!repo) {
          repo = {
            repo: repoName,
            images: [],
          };
          acc.push(repo);
        }
        repo.images.push(image);
        return acc;
      }
      acc.push(image);
      return acc;
    }, []);
};
