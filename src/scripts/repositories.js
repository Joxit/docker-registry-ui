import { DockerRegistryUIError } from './error.js';
const ERROR_CODE = 'CATALOG_BRANCHING_CONFIGURATION';

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

const cleanInt = (n) => (n === '' ? 1 : parseInt(n));

export const getBranching = (min = 1, max = 1) => {
  min = cleanInt(min);
  max = cleanInt(max);
  if (isNaN(min) || isNaN(max)) {
    throw new DockerRegistryUIError(`min and max must be integers: (min: ${min} and max: ${max}))`, ERROR_CODE);
  } else if (min > max) {
    throw new DockerRegistryUIError(`min must be inferior to max (min: ${min} <= max: ${max})`, ERROR_CODE);
  } else if (max < 0 || min < 0) {
    throw new DockerRegistryUIError(
      `min and max must be greater than equals to 0 (min: ${min} >= 0 and max: ${max} >= 0)`,
      ERROR_CODE
    );
  }
  if (max == 1) {
    min = 1;
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
