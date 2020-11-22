import { baseUrl, dataQuery } from "./utils";
import { renderRepositoryTemplate } from "./template";

const header = document.querySelector("header.header-container");
const details = document.querySelectorAll("details");
const main = document.querySelector("body");
const hamburger = document.querySelector(".hambuger-container");
const hamburgerItems = document.querySelector("#hamburger-items");
const avatarElements = document.querySelectorAll(".avatar");
const repoCountElement = document.querySelector(".repo-count");
const loginUsername = document.querySelectorAll("#loginUsername");
const loginProfilename = document.querySelector(".profile-name");
const profileBio = document.querySelector(".profile-bio");
const templateElements = document.querySelectorAll(".template");
hamburger.addEventListener("click", () => {
  hamburgerItems.classList.toggle("d-none");
});

header.addEventListener("click", () => {
  details.forEach((detail) => (detail.open = false));
});
main.addEventListener("click", () => {
  details.forEach((detail) => (detail.open = false));
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

    repoCountElement.innerHTML = data.data.user.repositories.totalCount;

    loginProfilename.innerHTML = data.data.user.name;

    profileBio.innerHTML = data.data.user.bio;

    avatarElements.forEach((avatar) => {
      avatar.setAttribute("src", data.data.user.avatarUrl);
      avatar.setAttribute("alt", data.data.user.login);
      avatar.classList.remove("loading");
    });

    loginUsername.forEach((username) => {
      username.innerHTML = data.data.user.login;
    });

    console.log(data.data.user);
    renderRepositoryTemplate(data.data.user.repositories);
    templateElements.forEach((template) => {
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
