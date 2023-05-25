const getRepositoryName = (split, max) => {
  let repositoryName = '';
  for (let i = 0; i < max; i++) {
    repositoryName += `${split[i]}/`;
  }
  return repositoryName;
};

export const getBranching =
  (min = 1, max = 1) =>
  (repositories) =>
    repositories.sort().reduce(function (acc, image) {
      const split = image.split('/');
      if (split.length > min && min > 0) {
        const repoName = getRepositoryName(split, max);
        if (acc.length === 0 || acc[acc.length - 1].repo != repoName) {
          acc.push({
            repo: repoName,
            images: [],
          });
        }
        acc[acc.length - 1].images.push(image);
        return acc;
      }
      acc.push(image);
      return acc;
    }, []);
