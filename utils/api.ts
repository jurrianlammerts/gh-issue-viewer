export const fetchRepository = (githubUser: string, repoName: string) => {
  return fetch(`https://api.github.com/repos/${githubUser}/${repoName}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log(error);
    });
};

export const fetchRepositoryIssues = (
  githubUser: string,
  repoName: string,
  page: number,
  sort?: string,
) => {
  return fetch(
    `https://api.github.com/repos/${githubUser}/${repoName}/issues?per_page=20&page=${page}${
      sort ? `&sort=${sort}` : ''
    }`,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log(error);
    });
};
