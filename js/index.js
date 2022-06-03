window.addEventListener("load", loadDatabase);

const testimonials = [],
  plans = [],
  prices = [],
  timer = [],
  link = [];

function loadDatabase() {
  fetch("config.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.testimonials.forEach((testimonial) => {
        testimonials.push(testimonial);
      });

      data.plans.forEach((plan) => {
        plans.push(plan);
        prices.push(plan.price);
      });

      timer.push(data.timerEndDate);
      link.push(data.appStoreLink);

      setLink();
      showTimer();
      showPlans();
      showTestimonials();
      changePlan();
    });
}

// Ссылки для загрузки приложения

const setLink = function () {
  const headerButton = document.querySelectorAll(".download__button");
  headerButton.forEach((button) => button.setAttribute("href", link[0]));
};

// Таймер

const showTimer = function () {
  let timerEndDate = timer[0].split(".");
  [timerEndDate[0], timerEndDate[1]] = [timerEndDate[1], timerEndDate[0]];

  let date = new Date(timerEndDate);

  function count() {
    let now = new Date();

    period = date - now;

    let days = Math.floor(period / 1000 / 60 / 60 / 24);
    let hours = Math.floor(period / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(period / 1000 / 60) % 60;
    let seconds = Math.floor(period / 1000) % 60;

    let dateData = { days, hours, minutes, seconds };

    if (period < 0) {
      document.querySelector(".sale").classList.remove("visable");
    } else {
      document.querySelector(".sale").classList.add("visable");
      Object.keys(dateData).map((item) => {
        document.querySelector(`.${item}`).innerText =
          `${dateData[item]}` < 10
            ? "0" + String(`${dateData[item]}`)
            : `${dateData[item]}`;
      });
    }
  }

  setInterval(() => count(), 1000);
};

// Шаблон для создания карточек

const createCard = function (type, className, text, attrName, attr) {
  const element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.append(text);
  }
  if (attr) {
    element.setAttribute(attrName, attr);
  }
  return element;
};

// Создание карточек - Тарифнай план

const showPlans = function () {
  const pricingList = document.querySelector(".pricing__list");
  const buttonPrice = document.querySelectorAll(".modal__button-input");

  plans.forEach((plan, ind) => {
    const li = createCard("li", "pricing__item");
    const h2 = createCard("h2", "pricing__item-title", plan.name);
    const p = createCard("p", "pricing__item-price", `$${plan.price}`);
    const span = createCard(
      "span",
      "pricing__item-period",
      "buy now",
      "data-price",
      plan.price
    );

    const button = createCard(
      "button",
      "buy",
      "buy now",
      "data-price",
      plan.name
    );

    prices.sort((a, b) => b - a);

    switch (span.getAttribute("data-price")) {
      case `${prices[2]}`:
        span.textContent = "Monthly";
        break;
      case `${prices[1]}`:
        span.textContent = "Annual";
        break;
      case `${prices[0]}`:
        span.textContent = "Up front";
        break;
    }

    buttonPrice[2].checked = true;

    button.className = "pricing__item-button button-buy";

    // Автоматический выбор тарифа

    const body = document.querySelector("body");

    button.addEventListener("click", () => {
      modal.style.display = "block";
      body.classList.add("non-scroll");

      if (button.dataset.price == buttonPrice[ind].id) {
        buttonPrice[ind].checked = true;
      }
    });

    li.append(h2, p, span, button);
    pricingList.append(li);
  });
};

// Создание карточек - Отзывы

const showTestimonials = function () {
  const testimonialsList = document.querySelector(".testimonials__list");

  testimonials.forEach((testimonial) => {
    const li = createCard("li", "testimonials__item");
    const div = createCard("div");
    const h2 = createCard("h2", "testimonials__item-text", testimonial.text);
    const p = createCard("p", "testimonials__item-name", testimonial.name);
    const span = createCard(
      "span",
      "testimonials__item-position",
      testimonial.job
    );
    div.append(p, span);
    li.append(h2, div);
    testimonialsList.append(li);
  });
};

// Выбор тарифного плана

const buttonBuy = document.querySelectorAll(".pricing__item-button");
const buttonPrice = document.querySelectorAll(".modal__button-input");
const priceName = document.querySelectorAll(".modal__button-item");

const changePlan = function () {
  plans.forEach((plan, ind) => {
    priceName[ind].textContent = plan.name;
    priceName[ind].setAttribute("for", plan.name);
    buttonPrice[ind].setAttribute("id", plan.name);
  });

  buttonBuy.forEach((button, ind) => {
    button.onclick = () => {
      if (button.dataset.price == buttonPrice[ind].id) {
        buttonPrice[ind].checked = true;
      }
    };
  });
};

// Открытие модального окна

const bannerButton = document.querySelectorAll(".button-buy");
const closeButton = document.querySelector(".modal__closeButton");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");

bannerButton.forEach((button) => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
    body.classList.add("non-scroll");
  });
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  body.classList.remove("non-scroll");
});

// Изменение темы

let changeModeButton = document.querySelector(".theme__mode");
let theme = document.querySelector(".theme");
let themeIcons = document.querySelectorAll(".theme__mode-toggle");
let themeName = document.querySelector(".mode-name");
let themeTitle = document.querySelector(".theme-name");

changeModeButton.addEventListener("click", changeTheme);

function changeTheme(e) {
  if (e.target.innerHTML == "light mode") {
    theme.classList.add("light");
    themeName.textContent = "light";
    themeTitle.textContent = "light mode";
    themeIcons.forEach((icon) => {
      icon.classList.add("light-mode");
    });
  } else if (e.target.innerHTML == "dark mode") {
    theme.classList.remove("light");
    themeName.textContent = "dark";
    themeTitle.textContent = "dark mode";
    themeIcons.forEach((icon) => {
      icon.classList.remove("light-mode");
    });
  }
}

// Send data

const sendButton = document.querySelector(".modal_sendButton");
const inputs = document.querySelectorAll(".modal__input-item");
const checkbox = document.querySelectorAll(".modal__checkbox-check");
const checkboxItem = document.querySelectorAll(".modal__checkbox-item");
const error = document.querySelectorAll(".modal__input-error");

const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
console.log(checkbox);

// Валидация формы

let valid = [false, false, false];

inputs.forEach((input, ind) => {
  input.oninput = function () {
    if (input.value.trim().length < 1) {
      input.style.background = "#FFEEEE";
      error[ind].classList.add("show-errorZero");
      error[ind].classList.remove("show-errorThree");
      valid[ind] = false;
    } else if (input.value.trim().length < 3) {
      input.style.background = "#FFEEEE";
      error[ind].classList.add("show-errorThree");
      valid[ind] = false;
    } else {
      error[ind].classList.remove("show-errorZero");
      error[ind].classList.remove("show-errorThree");
      input.style.background = "#e5f4ff";
      valid[ind] = true;
    }

    // else if (emailReg.test(inputs[1].value) !== true) {
    //   error[1].classList.add("show-errorZero");
    // }
  };
});

checkboxItem.forEach((check, ind) => {
  check.addEventListener("click", () => {
    check.toggleAttribute("checked");
    valid[2] = true;
    console.log(check.innerText);
    buttonPrice[ind].checked;
  });
});

if (valid[0] && valid[1]) {
  sendButton.setAttribute("disabled", false);
} else sendButton.setAttribute("disabled", true);

sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (valid[0] && valid[1]) {
    console.log(inputs[0].value, inputs[1].value);
  }
});

// Бургер меню

const burgerMenu = document.querySelector(".header__burgermenu-open");
const headerMenuItem = document.querySelectorAll(".header__menu-item");
const menu = document.querySelector(".header__menu");

burgerMenu.addEventListener("click", () => {
  menu.classList.toggle("header__menu-vision");
  burgerMenu.classList.toggle("header__burgermenu-close");
});

headerMenuItem.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("header__menu-vision");
    burgerMenu.classList.remove("header__burgermenu-close");
  });
});
