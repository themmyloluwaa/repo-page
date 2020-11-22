export const baseUrl = "https://api.github.com/graphql";

export const formatDate = (date) => {
  if (date.length === 0) {
    return `Invalid date input`;
  }

  const repoDate = new Date(date);
  const currentDate = new Date();
  const diffOfDays = parseInt(
    (currentDate.getTime() - repoDate.getTime()) / (1000 * 3600 * 24)
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (diffOfDays > 364) {
    return `${repoDate.getDate()} ${
      months[repoDate.getMonth()]
    } ${diffOfDays} days ago.`;
  }

  return `${repoDate.getDate()} ${months[repoDate.getMonth()]}.`;
};

export const dataQuery = `
query userData {
user(login: "${process.env.USERNAME}") {
    avatarUrl
    bio
    name
    login
    repositories(first: 20, orderBy: {direction: DESC, field: CREATED_AT}) {
      totalCount
      nodes {
        id
        name
        updatedAt
        stargazerCount
        description
        forkCount
        isPrivate
        licenseInfo{
          name
        }
        languages(first: 1) {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
}
`;
