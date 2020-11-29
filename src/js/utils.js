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

  // find the difference in the date now and the date received and convert it to days
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

  // if the difference between them is less than a day
  if (diffOfDays < 1) {
    // then we are certain the repository was updated some hours ago to the current date.

    // get the hour difference between now and the repository
    const hourDifference = currentDate.getHours() - repoDate.getHours();

    // if it's less than an hour, return now else return the hours.
    return hourDifference === 0 ? "now" : `${hourDifference} hour ago`;
  }
  // if the difference between them is eqaul to a day
  else if (diffOfDays === 1) {
    return `yesterday`;
    // if the difference between them is greater than a year
  } else if (diffOfDays >= 365) {
    return `${repoDate.getDate()} ${
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
    repositories(first: 20, orderBy: {direction: DESC, field: UPDATED_AT}) {
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
        languages(first: 1 orderBy:{direction:DESC, field:SIZE}) {
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
