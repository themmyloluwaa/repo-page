// format date based on github's specification
export const formatDate = (date) => {
  // check that a date string is correctly passed as input
  if (date.length === 0) {
    return `Invalid date input`;
  }

  // convert the received date to js date format
  const repoDate = new Date(date);

  // the date now now
  const currentDate = new Date();

  // difference in the date now and the date received and convert it to days
  const diffOfDays = parseInt(
    (currentDate.getTime() - repoDate.getTime()) / (1000 * 3600 * 24)
  );

  // array of months
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

  // if the difference between them is greater than a day

  if (diffOfDays < 1) {
    return `today`;
  }
  // if the difference between them is eqaul to a day
  else if (diffOfDays === 1) {
    return `yesterday`;
    // if the difference between them is greater than a year
  } else if (diffOfDays >= 365) {
    return `on ${repoDate.getDate()} ${
      months[repoDate.getMonth()]
    } ${diffOfDays} days ago`;
  }
  // else the date difference is less than a year but not today.
  return `on ${repoDate.getDate()} ${months[repoDate.getMonth()]}`;
};

// GraphQL query for user's data
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
