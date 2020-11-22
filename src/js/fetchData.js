import { baseUrl, dataQuery } from "./utils";
import { renderRepositoryTemplate } from "./template";
import * as SelectedElements from "./selectedElements";

async function fetchData() {
  try {
    const data = await fetch(baseUrl, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify({ query: dataQuery }),
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((e) => console.log(e));

    const user = data.data.user;

    SelectedElements.repoCountElement.forEach((repoEl) => {
      repoEl.innerHTML = user.repositories.totalCount;
      repoEl.setAttribute("title", user.repositories.totalCount);
    });

    SelectedElements.loginProfilename.innerHTML = user.name;

    SelectedElements.profileBio.innerHTML = user.bio;

    SelectedElements.avatarElements.forEach((avatar) => {
      avatar.setAttribute("src", user.avatarUrl);
      avatar.setAttribute("alt", user.login);
      avatar.classList.remove("loading");
    });

    SelectedElements.loginUsername.forEach((username) => {
      username.innerHTML = user.login;
    });

    renderRepositoryTemplate(user.repositories);
    SelectedElements.templateElements.forEach((template) => {
      template.classList.remove("template");
      template.classList.remove("loading");
      template.classList.add("d-none");
    });
  } catch (e) {
    console.log(e);
  }
}

export default fetchData;
