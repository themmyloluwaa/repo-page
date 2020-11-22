// select the header element
const header = document.querySelector("header.header-container");

// select all the details element
const details = document.querySelectorAll("details");

// select the entire body of the page
const main = document.querySelector("body");

// select the hambuger click element
const hamburger = document.querySelector(".hambuger-container");

// select the elements controlled by the hambuger
const hamburgerItems = document.querySelector("#hamburger-items");

// select all the profile picture elements
const avatarElements = document.querySelectorAll(".avatar");

// select the repo count element container
const repoCountElement = document.querySelectorAll(".repo-count");

// select the user's username element
const loginUsername = document.querySelectorAll("#loginUsername");

// select the user's name element
const loginProfilename = document.querySelector(".profile-name");

// select the user's bio element
const profileBio = document.querySelector(".profile-bio");

// select the templates of repo container
const templateElements = document.querySelectorAll(".template");

export {
  header,
  details,
  main,
  hamburger,
  hamburgerItems,
  avatarElements,
  repoCountElement,
  loginUsername,
  loginProfilename,
  profileBio,
  templateElements,
};
