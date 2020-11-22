import * as SelectedElements from "./selectedElements";

import fetchData from "./fetchData";

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

// fetch the data on page load
window.addEventListener("load", async () => await fetchData());

// set user's profile name and pic visible on scroll height at 393
document.addEventListener("scroll", () => {
  var scrollTop = window.pageYOffset;
  const stickyAvatar = document.querySelector(".u-profile-sticky");
  if (scrollTop > 393) {
    stickyAvatar.style.opacity = 1;
  } else {
    stickyAvatar.style.opacity = 0;
  }
});
