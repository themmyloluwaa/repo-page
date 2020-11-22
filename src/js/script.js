import { baseUrl, dataQuery } from "./utils";
import { renderRepositoryTemplate } from "./template";
import * as SelectedElements from "./selectedElements";


// handle navigation items display on mobile
SelectedElements.hamburger.addEventListener("click", () => {
  SelectedElements.hamburgerItems.classList.toggle("d-none");
});

// handle details element display 
SelectedElements.header.addEventListener("click", () => {
  SelectedElements.details.forEach((detail) => (detail.open = false));
});

// handle details element display 
SelectedElements.main.addEventListener("click", () => {
  SelectedElements.details.forEach((detail) => (detail.open = false));
});

const fetchData = async () => {
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

    SelectedElements.repoCountElement.forEach((repoEl) => {
      repoEl.innerHTML = data.data.user.repositories.totalCount;
      repoEl.setAttribute("title", data.data.user.repositories.totalCount);
    });

    SelectedElements.loginProfilename.innerHTML = data.data.user.name;

    SelectedElements.profileBio.innerHTML = data.data.user.bio;

    SelectedElements.avatarElements.forEach((avatar) => {
      avatar.setAttribute("src", data.data.user.avatarUrl);
      avatar.setAttribute("alt", data.data.user.login);
      avatar.classList.remove("loading");
    });

    SelectedElements.loginUsername.forEach((username) => {
      username.innerHTML = data.data.user.login;
    });

    renderRepositoryTemplate(data.data.user.repositories);
    SelectedElements.templateElements.forEach((template) => {
      template.classList.remove("template");
      template.classList.remove("loading");
      template.classList.add("d-none");
    });
  } catch (e) {
    console.log(e);
  }
};

window.addEventListener("load", async () => await fetchData());

document.addEventListener("scroll", () => {
  var scrollTop = window.pageYOffset;
  const stickyAvatar = document.querySelector(".u-profile-sticky");
  if (scrollTop > 393) {
    stickyAvatar.style.opacity = 1;
  } else {
    stickyAvatar.style.opacity = 0;
  }
});
