import { dataQuery } from "./utils";
import { renderRepositoryTemplate } from "./template";
import * as SelectedElements from "./selectedElements";

async function fetchData() {
  try {
    const data = await fetch(process.env.GITHUB_URL, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: dataQuery }),
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((e) => console.log(e));

    const user = data.data.user;

    // set the repository count element's value
    SelectedElements.repoCountElement.forEach((repoEl) => {
      repoEl.innerHTML = user.repositories.totalCount;
      repoEl.setAttribute("title", user.repositories.totalCount);
    });

    // set the element value to the user's name
    SelectedElements.loginProfilename.innerHTML = user.name;

    // set the element value to the user's bio
    SelectedElements.profileBio.innerHTML = user.bio;

    // set the image src to the user's photo url
    SelectedElements.avatarElements.forEach((avatar) => {
      avatar.classList.remove("onload");
      avatar.setAttribute("src", user.avatarUrl);
      avatar.setAttribute("alt", user.login);
    });

    // set the element value to the user's username
    SelectedElements.loginUsername.forEach((username) => {
      username.innerHTML = user.login;
    });

    // render the repository list elements
    renderRepositoryTemplate(user.repositories);

    // remove template element class and set it to display noe
    SelectedElements.templateElements.forEach((template) => {
      template.classList.remove("template");
      template.classList.remove("onload");
      template.classList.add("d-none");
    });
  } catch (e) {
    console.log(e);
  }
}

export default fetchData;
