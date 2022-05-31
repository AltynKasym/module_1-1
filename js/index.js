window.addEventListener("load", loadDatabase);

const testimonials = [],
  plans = [],
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

      data.plans.forEach((plan) => plans.push(plan));

      timer.push(data.timerEndDate);
      link.push(data.appStoreLink);

      setLink();
      showTimer();
      showPlans();
      showTestimonials();
      count();
    });
}

// Установка ссылки в header

const setLink = function () {
  const headerButton = document.querySelector(".header__button a");
  headerButton.setAttribute("href", link[0]);
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
      document.querySelector(".sale").style.display = "none";
    } else {
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

const createCard = function (type, className, text, dataName, data) {
  const element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.append(text);
  }
  if (data) {
    element.setAttribute(dataName, data);
  }
  return element;
};

// Создание карточек - План

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
      plan.name
    );

    const button = createCard(
      "button",
      "buy",
      "buy now",
      "data-price",
      plan.name
    );

    switch (span.getAttribute("data-price")) {
      case "standard":
        span.textContent = "Monthly";
        break;
      case "premium":
        span.textContent = "Annual";
        break;
      case "lifetime":
        span.textContent = "Up front";
        break;
    }

    button.className = "pricing__item-button button-buy";

    // Автоматический выбор тарифа

    button.addEventListener("click", () => {
      modal.style.display = "block";

      if (button.dataset.price == buttonPrice[ind].id) {
        buttonPrice[ind].checked = true;
      } else buttonPrice[2].checked = true;
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
    const h2 = createCard("h2", "testimonials__item-text", testimonial.text);
    const p = createCard("p", "testimonials__item-name", testimonial.name);
    const span = createCard(
      "span",
      "testimonials__item-position",
      testimonial.job
    );

    li.append(h2, p, span);
    testimonialsList.append(li);
  });
};

// Change the plan

const buttonBuy = document.querySelectorAll(".pricing__item-button");
const buttonPrice = document.querySelectorAll(".modal__button-input");

buttonBuy.forEach((button, ind) => {
  button.onclick = () => {
    if (button.dataset.price == buttonPrice[ind].id) {
      buttonPrice[ind].checked = true;
    }
  };
});

// Open Modal window

const bannerButton = document.querySelectorAll(".button-buy");
const closeButton = document.querySelector(".modal__closeButton");
const modal = document.querySelector(".modal");

bannerButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    modal.style.display = "block";
  });
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Send data

const sendButton = document.querySelector(".modal_sendButton");
sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Validate inputs

  let error = document.querySelectorAll(".modal__input-error");
  let inputs = document.querySelectorAll(".modal__input-item");

  // const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  inputs.forEach((input, ind) => {
    // input.onblur = function () {
    //   input.style.background = "#FFEEEE";
    //   if (input.value.trim().length < 1) {
    //     error[ind].textContent = "required field*";
    //     error[ind].style.opacity = "1";
    //   } else if (input.value.trim().length < 3) {
    //     error[ind].textContent = `should be more then 3 symbols`;
    //     error[ind].style.opacity = "1";
    //   }
    //   // else if (emailReg.test(inputs[1].value) !== true) {
    //   //   error[1].textContent = `should be consist email characters`;
    //   //   error[1].style.opacity = "1";
    //   // }
    //   else {
    //     error[ind].style.opacity = "0";
    //     input.style.background = "#e5f4ff";
    //   }
    // };
    // input.addEventListener('')
  });
});

// Change Theme

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
