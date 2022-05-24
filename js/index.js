// // window.addEventListener("load", loadDatabase);

// // function loadDatabase() {
// //   const xhr = new XMLHttpRequest();
// //   const timer = document.querySelector(".sale__timer");
// //   const headerLink = document.querySelector(".header__link");

// //   xhr.open("GET", "config.json", true);
// //   xhr.onload = function () {
// //     if (this.status === 200) {
// //       const database = JSON.parse(this.response);
// //       // timer.append(database.timerEndDate);
// //       headerLink.setAttribute("href", database.appStoreLink);
// //     } else {
// //       alert("Service not found");
// //     }
// //   };

// //   xhr.send();
// // }

// // Change the plan

const planButton = document.querySelectorAll(".modal__button-item");
planButton.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("modal__button-select");
  });
});

const bannerButton = document.querySelectorAll(".button-buy");
const modal = document.querySelector(".modal");

// bannerButtons.addEventListener("click", (e) => {
//   if (e.target.innerHTML == "buy now") {
//     modal.style.display = "block";
//   }
//   e.preventDefault();
// });

bannerButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    modal.style.display = "block";
    console.log(e);
  });
});

let error = document.querySelector(".modal__input-error");
let input = document.querySelectorAll(".modal__input-item");

input.forEach((item) => {
  item.onblur = function () {
    if (item.value.trim().length < 1) {
      error.innerHTML = `<p>required field</p>`;
    } else if (item.value.trim().length < 3) {
      error.innerHTML = `<p>should be more then 3 symbols</p>`;
    } else error.innerHTML = "";
  };
});

// Change Theme

let changeModeButton = document.querySelector(".theme__mode");
let theme = document.querySelector(".theme");
let themeIcons = document.querySelectorAll(".theme__mode-toggle");

changeModeButton.addEventListener("click", (e) => {
  if (e.target.innerHTML == "light mode") {
    theme.classList.add("light");
    themeIcons.forEach((icon) => {
      icon.classList.add("light-mode");
    });
  } else if (e.target.innerHTML == "dark mode") {
    theme.classList.remove("light");
    themeIcons.forEach((icon) => {
      icon.classList.remove("light-mode");
    });
  }
});
