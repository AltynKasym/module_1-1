window.addEventListener("load", loadDatabase);

function loadDatabase() {
  const xhr = new XMLHttpRequest();
  const timer = document.querySelector(".sale__timer");
  const headerLink = document.querySelector(".header__link");

  xhr.open("GET", "config.json", true);
  xhr.onload = function () {
    if (this.status === 200) {
      const database = JSON.parse(this.response);
      timer.append(database.timerEndDate);
      headerLink.setAttribute("href", database.appStoreLink);
    } else {
      alert("Service not found");
    }
  };

  xhr.send();
}
